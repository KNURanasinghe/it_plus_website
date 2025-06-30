'use client';

import { useState, useEffect } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [galleryImages, setGalleryImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // PocketBase API configuration
  const POCKETBASE_URL = 'http://127.0.0.1:8090';

  // Fetch gallery images from PocketBase
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${POCKETBASE_URL}/api/collections/gallary/records?sort=-created`);
        console.log('🌐 API Response Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Successfully fetched', data.items.length, 'gallery images');
        
        // Transform data to match component structure - DIRECTLY use external URLs
        const transformedImages = data.items.map((image, index) => {
          console.log(`🔄 Processing image ${index + 1}:`, {
            id: image.id,
            originalSrc: image.src,
            category: image.category,
            title: image.title
          });
          
          // DIRECTLY use the src field since it contains external URLs
          const finalImageUrl = image.src; // No processing needed for external URLs
          
          console.log(`✅ Final URL for image ${index + 1}:`, finalImageUrl);
          
          return {
            id: image.id,
            src: finalImageUrl, // Direct external URL
            alt: image.alt || `Gallery image ${index + 1}`,
            category: image.category || 'general',
            title: image.title || `Image ${index + 1}`
          };
        });

        console.log('📊 Total transformed images:', transformedImages.length);
        setGalleryImages(transformedImages);

        // Generate categories dynamically from the fetched data
        const uniqueCategories = [...new Set(transformedImages.map(img => img.category))];
        console.log('📂 Found categories:', uniqueCategories);
        
        const categoriesWithCounts = [
          { id: 'all', name: 'All Images', count: transformedImages.length },
          ...uniqueCategories.map(cat => ({
            id: cat,
            name: cat.charAt(0).toUpperCase() + cat.slice(1),
            count: transformedImages.filter(img => img.category === cat).length
          }))
        ];

        console.log('🏷️ Categories with counts:', categoriesWithCounts);
        setCategories(categoriesWithCounts);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching gallery images:', err);
        setError('Failed to load gallery images. Please try again later.');
        
        // Fallback to default data if API fails
        const fallbackImages = [
          { 
            id: 1, 
            src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', 
            alt: 'Modern office space', 
            category: 'office',
            title: 'Modern Office Design'
          },
          { 
            id: 2, 
            src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop', 
            alt: 'Team collaboration', 
            category: 'team',
            title: 'Team Collaboration'
          },
          { 
            id: 3, 
            src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop', 
            alt: 'Technology workspace', 
            category: 'technology',
            title: 'Technology Workspace'
          }
        ];

        setGalleryImages(fallbackImages);
        setCategories([
          { id: 'all', name: 'All Images', count: fallbackImages.length },
          { id: 'office', name: 'Office', count: 1 },
          { id: 'team', name: 'Team', count: 1 },
          { id: 'technology', name: 'Technology', count: 1 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  console.log('🔍 Current filter state:', {
    selectedCategory,
    totalImages: galleryImages.length,
    filteredCount: filteredImages.length
  });

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Loading state
  if (loading) {
    return (
      <div className="gallery-page-container">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading gallery images...</p>
        </div>
        <Footer />
        
        <style jsx>{`
          .gallery-page-container {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 50vh;
            gap: 20px;
          }
          
          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #4a00e0;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="gallery-page-container">
        <Header />
        <div className="error-container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
        <Footer />
        
        <style jsx>{`
          .gallery-page-container {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          .error-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 50vh;
            padding: 20px;
          }
          
          .error-message {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 500px;
          }
          
          .error-message h2 {
            color: #e74c3c;
            margin-bottom: 15px;
          }
          
          .error-message p {
            color: #666;
            margin-bottom: 25px;
          }
          
          .retry-button {
            background: #4a00e0;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s ease;
          }
          
          .retry-button:hover {
            background: #3a00b0;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="gallery-page-container">
      <Header/>
      {/* Gallery Hero Section */}
      <section className="gallery-hero-section">
        <div className="gallery-hero-content">
          <h1>Gallery</h1>
          <p>Showcasing our workspace, team, and innovative solutions</p>
        </div>
      </section>

      {/* Gallery Filter Section */}
      <section className="gallery-filter-section">
        <div className="container">
          <div className="section-header-stacked">
            <p className="section-path">\ Our Work \</p>
            <h2>Our Portfolio</h2>
          </div>
          
          <div className="filter-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => {
                  console.log('🎯 Clicked category:', category.id);
                  setSelectedCategory(category.id);
                }}
              >
                {category.name}
                <span className="count">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="gallery-grid-section">
        <div className="container">
          {/* Debug info for troubleshooting */}
          <div style={{
            marginBottom: '20px', 
            padding: '15px', 
            background: '#f0f0f0', 
            borderRadius: '8px',
            fontSize: '14px',
            border: '1px solid #ddd'
          }}>
            <strong>🔧 Debug Info:</strong><br/>
            Selected Category: <strong>{selectedCategory}</strong><br/>
            Total Images: <strong>{galleryImages.length}</strong><br/>
            Filtered Images: <strong>{filteredImages.length}</strong><br/>
            Available Categories: <strong>{categories.map(c => `${c.id}(${c.count})`).join(', ')}</strong>
          </div>
          
          {filteredImages.length > 0 ? (
            <div className="image-grid">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="image-item"
                  onClick={() => openLightbox(image)}
                >
                  <div className="image-overlay">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      onError={(e) => {
                        console.log('❌ Image failed to load:', image.src);
                        // Use a different fallback for each image
                        const fallbacks = [
                          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
                          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
                          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
                          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
                        ];
                        e.target.src = fallbacks[index % fallbacks.length];
                      }}
                      onLoad={() => {
                        console.log('✅ Image loaded successfully:', image.src.substring(0, 50) + '...');
                      }}
                    />
                    <div className="image-info">
                      <h3>{image.title}</h3>
                      <p style={{fontSize: '0.8em', margin: '5px 0', opacity: 0.8}}>
                        {image.category}
                      </p>
                      <div className="zoom-icon">🔍</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-images-message">
              <h3>No images found in this category</h3>
              <p>Try selecting a different category or check back later.</p>
              <div style={{fontSize: '0.9em', color: '#999', marginTop: '10px'}}>
                <strong>Available:</strong> {categories.map(c => c.id).join(', ')}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-prev" onClick={prevImage}>‹</button>
            <button className="lightbox-next" onClick={nextImage}>›</button>
            
            <div className="lightbox-image-container">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop";
                }}
              />
            </div>
            
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p className="lightbox-category">Category: {selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
      
      <Footer/>

      <style jsx>{`
        .gallery-page-container {
          font-family: 'Inter', sans-serif;
          color: #333;
          line-height: 1.6;
          background-color: #f8f9fa;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 1rem;
          width: 100%;
          box-sizing: border-box;
        }

        .no-images-message {
          text-align: center;
          background: white;
          padding: 60px 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: 40px auto;
        }

        .no-images-message h3 {
          color: #4a00e0;
          margin-bottom: 15px;
          font-size: 1.5em;
        }

        .no-images-message p {
          color: #666;
          margin: 0 0 15px 0;
        }

        /* Gallery Hero Section */
        .gallery-hero-section {
          background: linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%);
          color: white;
          padding: clamp(60px, 10vw, 100px) 1rem clamp(40px, 8vw, 80px);
          text-align: center;
          position: relative;
          overflow: hidden;
          border-radius: 0 0 clamp(30px, 8vw, 100px) clamp(30px, 8vw, 100px);
          width: 100%;
        }

        .gallery-hero-content h1 {
          font-size: clamp(2rem, 6vw, 3.5rem);
          margin-bottom: clamp(10px, 2vw, 20px);
          letter-spacing: 1px;
          font-weight: 700;
        }

        .gallery-hero-content p {
          font-size: clamp(1rem, 3vw, 1.2rem);
          opacity: 0.9;
          max-width: clamp(400px, 50vw, 600px);
          margin: 0 auto;
        }

        /* Filter Section */
        .gallery-filter-section {
          padding: clamp(20px, 5vw, 40px) 0 clamp(10px, 3vw, 20px);
          background-color: #f8f9fa;
        }

        .section-header-stacked {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: clamp(20px, 5vw, 40px);
          margin-top: clamp(40px, 8vw, 80px);
        }

        .section-header-stacked .section-path {
          color: #4a00e0;
          font-size: clamp(0.8rem, 2vw, 0.9rem);
          margin-bottom: clamp(5px, 1vw, 10px);
          font-weight: 500;
        }

        .section-header-stacked h2 {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          color: #333;
          font-weight: 700;
          margin: 0;
        }

        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: clamp(8px, 2vw, 15px);
          flex-wrap: wrap;
          margin-bottom: clamp(20px, 5vw, 40px);
        }

        .filter-tab {
          background: white;
          border: 2px solid #e0e0e0;
          color: #666;
          padding: clamp(8px, 2vw, 12px) clamp(16px, 3vw, 24px);
          border-radius: 30px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: clamp(5px, 1vw, 8px);
          font-size: clamp(0.9rem, 2.5vw, 1rem);
        }

        .filter-tab:hover {
          border-color: #4a00e0;
          color: #4a00e0;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(74, 0, 224, 0.2);
        }

        .filter-tab.active {
          background: linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%);
          border-color: #4a00e0;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(74, 0, 224, 0.3);
        }

        .count {
          font-size: clamp(0.8rem, 2vw, 0.9rem);
          opacity: 0.8;
        }

        /* Gallery Grid Section */
        .gallery-grid-section {
          padding: clamp(20px, 5vw, 40px) 0 clamp(40px, 8vw, 80px);
          background-color: #f8f9fa;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(250px, 30vw, 350px), 1fr));
          gap: clamp(15px, 3vw, 25px);
        }

        .image-item {
          background-color: #ffffff;
          border-radius: clamp(10px, 2vw, 20px);
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .image-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
        }

        .image-overlay {
          position: relative;
          overflow: hidden;
        }

        .image-item img {
          width: 100%;
          height: clamp(200px, 25vw, 300px);
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .image-item:hover img {
          transform: scale(1.05);
        }

        .image-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: clamp(20px, 3vw, 30px) clamp(10px, 2vw, 20px) clamp(10px, 2vw, 20px);
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .image-item:hover .image-info {
          transform: translateY(0);
        }

        .image-info h3 {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          font-weight: 600;
          margin: 0 0 clamp(5px, 1vw, 10px) 0;
        }

        .zoom-icon {
          position: absolute;
          top: clamp(10px, 2vw, 15px);
          right: clamp(10px, 2vw, 20px);
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          opacity: 0.8;
        }

        /* Lightbox Styles */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .lightbox-content {
          position: relative;
          max-width: clamp(90%, 95vw, 95%);
          max-height: clamp(90%, 95vh, 95%);
          background: white;
          border-radius: clamp(10px, 2vw, 20px);
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .lightbox-close {
          position: absolute;
          top: clamp(10px, 2vw, 20px);
          right: clamp(10px, 2vw, 20px);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          width: clamp(30px, 5vw, 40px);
          height: clamp(30px, 5vw, 40px);
          border-radius: 50%;
          font-size: clamp(18px, 4vw, 24px);
          cursor: pointer;
          z-index: 1001;
          transition: background 0.3s ease;
        }

        .lightbox-close:hover {
          background: rgba(0, 0, 0, 0.9);
        }

        .lightbox-prev,
        .lightbox-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          width: clamp(40px, 6vw, 50px);
          height: clamp(40px, 6vw, 50px);
          border-radius: 50%;
          font-size: clamp(20px, 4vw, 24px);
          cursor: pointer;
          z-index: 1001;
          transition: all 0.3s ease;
        }

        .lightbox-prev {
          left: clamp(10px, 2vw, 20px);
        }

        .lightbox-next {
          right: clamp(10px, 2vw, 20px);
        }

        .lightbox-prev:hover,
        .lightbox-next:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          max-height: clamp(60vh, 70vh, 80vh);
        }

        .lightbox-image-container img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .lightbox-info {
          padding: clamp(15px, 3vw, 20px) clamp(20px, 4vw, 30px);
          background: white;
          border-top: 1px solid #eee;
        }

        .lightbox-info h3 {
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          color: #4a00e0;
          margin: 0 0 clamp(5px, 1vw, 10px) 0;
          font-weight: 600;
        }

        .lightbox-category {
          color: #666;
          font-size: clamp(0.9rem, 2.5vw, 1rem);
          margin: 0;
          text-transform: capitalize;
        }

        /* Responsive Adjustments */
        @media (max-width: 1280px) {
          .image-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: clamp(15px, 3vw, 20px);
          }
        }

        @media (max-width: 1024px) {
          .gallery-hero-section {
            padding: clamp(50px, 8vw, 80px) 1rem clamp(30px, 6vw, 60px);
          }

          .gallery-hero-content h1 {
            font-size: clamp(1.8rem, 5vw, 3rem);
          }

          .gallery-hero-content p {
            font-size: clamp(0.9rem, 2.5vw, 1.1rem);
          }

          .section-header-stacked h2 {
            font-size: clamp(1.3rem, 3.5vw, 2rem);
          }

          .image-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: clamp(12px, 2.5vw, 18px);
          }

          .image-item img {
            height: clamp(180px, 22vw, 250px);
          }
        }

        @media (max-width: 768px) {
          .filter-tabs {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: clamp(6px, 1.5vw, 10px);
          }

          .filter-tab {
            padding: clamp(8px, 2vw, 10px) clamp(12px, 2.5vw, 18px);
            font-size: clamp(0.85rem, 2.2vw, 0.95rem);
            min-width: 120px;
          }

          .image-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: clamp(10px, 2vw, 15px);
          }

          .image-item img {
            height: clamp(160px, 20vw, 220px);
          }

          .lightbox-prev,
          .lightbox-next {
            width: clamp(35px, 5vw, 45px);
            height: clamp(35px, 5vw, 45px);
            font-size: clamp(18px, 3.5vw, 22px);
          }

          .lightbox-prev {
            left: clamp(8px, 1.5vw, 15px);
          }

          .lightbox-next {
            right: clamp(8px, 1.5vw, 15px);
          }
        }

        @media (max-width: 640px) {
          .gallery-hero-section {
            padding: clamp(40px, 7vw, 60px) 1rem clamp(25px, 5vw, 50px);
          }

          .filter-tabs {
            flex-direction: column;
            align-items: center;
            gap: clamp(6px, 1.5vw, 8px);
          }

          .filter-tab {
            width: clamp(160px, 40vw, 200px);
            justify-content: center;
            padding: clamp(8px, 2vw, 10px) clamp(10px, 2vw, 15px);
            font-size: clamp(0.8rem, 2vw, 0.9rem);
          }

          .image-grid {
            grid-template-columns: 1fr;
            gap: clamp(8px, 2vw, 12px);
          }

          .image-item img {
            height: clamp(180px, 45vw, 240px);
          }

          .lightbox-content {
            max-width: 98vw;
            max-height: 98vh;
            border-radius: clamp(8px, 2vw, 12px);
          }

          .lightbox-close {
            width: clamp(28px, 6vw, 35px);
            height: clamp(28px, 6vw, 35px);
            font-size: clamp(16px, 4vw, 20px);
          }

          .lightbox-prev,
          .lightbox-next {
            width: clamp(30px, 6vw, 40px);
            height: clamp(30px, 6vw, 40px);
            font-size: clamp(16px, 4vw, 20px);
          }

          .lightbox-info {
            padding: clamp(10px, 2.5vw, 15px) clamp(15px, 3vw, 20px);
          }

          .lightbox-info h3 {
            font-size: clamp(1rem, 2.5vw, 1.3rem);
          }

          .lightbox-category {
            font-size: clamp(0.8rem, 2vw, 0.9rem);
          }
        }

        @media (max-width: 480px) {
          .gallery-hero-section {
            padding: clamp(30px, 6vw, 50px) 0.5rem clamp(20px, 4vw, 40px);
          }

          .gallery-hero-content h1 {
            font-size: clamp(1.5rem, 4.5vw, 2.5rem);
          }

          .gallery-hero-content p {
            font-size: clamp(0.85rem, 2.2vw, 1rem);
            max-width: 90%;
          }

          .section-header-stacked {
            margin-top: clamp(30px, 6vw, 60px);
            margin-bottom: clamp(15px, 3vw, 30px);
          }

          .section-header-stacked .section-path {
            font-size: clamp(0.7rem, 1.8vw, 0.8rem);
          }

          .section-header-stacked h2 {
            font-size: clamp(1.2rem, 3vw, 1.8rem);
          }

          .filter-tabs {
            gap: clamp(5px, 1.2vw, 7px);
          }

          .filter-tab {
            width: clamp(140px, 35vw, 180px);
            padding: clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 12px);
            font-size: clamp(0.75rem, 1.8vw, 0.85rem);
          }

          .image-grid {
            gap: clamp(6px, 1.5vw, 10px);
          }

          .image-item img {
            height: clamp(160px, 40vw, 220px);
          }

          .image-info {
            padding: clamp(15px, 3vw, 20px) clamp(8px, 2vw, 15px);
          }

          .image-info h3 {
            font-size: clamp(0.9rem, 2.2vw, 1.1rem);
          }

          .zoom-icon {
            font-size: clamp(1rem, 2.5vw, 1.3rem);
            top: clamp(8px, 1.5vw, 12px);
            right: clamp(8px, 1.5vw, 15px);
          }

          .lightbox-content {
            max-width: 100vw;
            max-height: 100vh;
            border-radius: clamp(6px, 1.5vw, 10px);
          }

          .lightbox-image-container {
            max-height: clamp(50vh, 65vh, 75vh);
          }
        }
      `}</style>
    </div>
  );
}