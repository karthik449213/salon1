
        // Scene setup for hero
        let heroScene, heroCamera, heroRenderer;
        let salonTools = [];

        function initHero3D() {
            heroScene = new THREE.Scene();
            heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            heroRenderer = new THREE.WebGLRenderer({ 
                canvas: document.getElementById('hero-canvas'),
                alpha: true,
                antialias: true
            });
            heroRenderer.setSize(window.innerWidth, window.innerHeight);
            heroRenderer.setClearColor(0x000000, 0);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xe8b4a0, 0.4);
            heroScene.add(ambientLight);

            const pointLight = new THREE.PointLight(0xe8b4a0, 1, 100);
            pointLight.position.set(10, 10, 10);
            heroScene.add(pointLight);

            // Create salon tools
            createSalonTools();

            heroCamera.position.z = 15;
            animateHero();
        }

        function createSalonTools() {
            // Scissors
            const scissorsGroup = new THREE.Group();
            const blade1 = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
            const blade2 = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
            const bladeMaterial = new THREE.MeshPhongMaterial({ color: 0xc0c0c0 });
            
            const scissorBlade1 = new THREE.Mesh(blade1, bladeMaterial);
            const scissorBlade2 = new THREE.Mesh(blade2, bladeMaterial);
            scissorBlade1.rotation.z = Math.PI / 6;
            scissorBlade2.rotation.z = -Math.PI / 6;
            scissorBlade1.position.x = -0.2;
            scissorBlade2.position.x = 0.2;
            
            scissorsGroup.add(scissorBlade1, scissorBlade2);
            scissorsGroup.position.set(-5, 2, 0);
            heroScene.add(scissorsGroup);
            salonTools.push(scissorsGroup);

            // Comb
            const combGeometry = new THREE.BoxGeometry(0.2, 3, 0.1);
            const combMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
            const comb = new THREE.Mesh(combGeometry, combMaterial);
            comb.position.set(5, -2, 0);
            heroScene.add(comb);
            salonTools.push(comb);

            // Hair dryer
            const dryerBody = new THREE.CylinderGeometry(0.5, 0.7, 2, 12);
            const dryerHandle = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 8);
            const dryerMaterial = new THREE.MeshPhongMaterial({ color: 0xe8b4a0 });
            
            const dryerBodyMesh = new THREE.Mesh(dryerBody, dryerMaterial);
            const dryerHandleMesh = new THREE.Mesh(dryerHandle, dryerMaterial);
            
            const dryerGroup = new THREE.Group();
            dryerBodyMesh.rotation.z = Math.PI / 2;
            dryerHandleMesh.rotation.z = Math.PI / 2;
            dryerHandleMesh.position.y = -1.5;
            
            dryerGroup.add(dryerBodyMesh, dryerHandleMesh);
            dryerGroup.position.set(0, 3, -2);
            heroScene.add(dryerGroup);
            salonTools.push(dryerGroup);

            // Mirror
            const mirrorGeometry = new THREE.CircleGeometry(1.5, 32);
            const mirrorMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xffffff, 
                transparent: true, 
                opacity: 0.8,
                reflectivity: 1
            });
            const mirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
            mirror.position.set(-3, -3, 1);
            heroScene.add(mirror);
            salonTools.push(mirror);
        }

        function animateHero() {
            requestAnimationFrame(animateHero);

            // Rotate and float salon tools
            salonTools.forEach((tool, index) => {
                tool.rotation.y += 0.01 + index * 0.002;
                tool.rotation.x += 0.005;
                tool.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            });

            heroRenderer.render(heroScene, heroCamera);
        }

        // Carousel 3D
        let carouselScene, carouselCamera, carouselRenderer;
        let hairstyles = [];

        function initCarousel3D() {
            const canvas = document.getElementById('carousel-canvas');
            if (!canvas) return;

            carouselScene = new THREE.Scene();
            carouselCamera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
            carouselRenderer = new THREE.WebGLRenderer({ 
                canvas: canvas,
                alpha: true,
                antialias: true
            });
            carouselRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
            carouselRenderer.setClearColor(0x000000, 0);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xe8b4a0, 0.6);
            carouselScene.add(ambientLight);

            const pointLight = new THREE.PointLight(0xffffff, 1, 100);
            pointLight.position.set(0, 5, 10);
            carouselScene.add(pointLight);

            // Create hairstyle representations
            createHairstyles();

            carouselCamera.position.z = 8;
            animateCarousel();

            // Mouse interaction
            let mouseX = 0;
            canvas.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX / canvas.clientWidth) * 2 - 1;
            });
        }

        function createHairstyles() {
            const styles = [
                { color: 0xffd700, name: 'Golden Waves' },
                { color: 0x8b4513, name: 'Chestnut Bob' },
                { color: 0x000000, name: 'Midnight Straight' },
                { color: 0xe8b4a0, name: 'Rose Gold Curls' },
                { color: 0x654321, name: 'Auburn Layers' }
            ];

            styles.forEach((style, index) => {
                const angle = (index / styles.length) * Math.PI * 2;
                const radius = 4;
                
                // Create a stylized hair representation
                const hairGeometry = new THREE.SphereGeometry(0.8, 16, 16);
                const hairMaterial = new THREE.MeshPhongMaterial({ color: style.color });
                const hair = new THREE.Mesh(hairGeometry, hairMaterial);
                
                hair.position.x = Math.cos(angle) * radius;
                hair.position.z = Math.sin(angle) * radius;
                hair.position.y = 0; // Remove reference to undefined 'time'
                
                // Scale based on distance from camera
                const distance = Math.abs(hair.position.z);
                hair.scale.setScalar(1 - distance * 0.1);
                
                hair.rotation.y += 0.02;
                hair.userData = { originalAngle: angle, name: style.name };
                
                carouselScene.add(hair);
                hairstyles.push(hair);
            });
        }

        function animateCarousel() {
            requestAnimationFrame(animateCarousel);

            // Rotate hairstyles and animate vertical position
            const time = Date.now() * 0.001;
            hairstyles.forEach((hair, index) => {
                const angle = hair.userData.originalAngle + time * 0.3;
                const radius = 4;
                hair.position.x = Math.cos(angle) * radius;
                hair.position.z = Math.sin(angle) * radius;
                hair.position.y = Math.sin(time + index) * 0.5; // Animate up/down
                // Optionally, update scale for depth effect
                const distance = Math.abs(hair.position.z);
                hair.scale.setScalar(1 - distance * 0.1);
            });

            if (carouselRenderer) {
                carouselRenderer.render(carouselScene, carouselCamera);
            }
        }

        // Scroll animations
        function initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });

            document.querySelectorAll('.section').forEach(section => {
                observer.observe(section);
            });
        }

        // Parallax effects
        function initParallax() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.service-card, .stylist-card');
                
                parallaxElements.forEach((element, index) => {
                    const speed = 0.5 + (index % 3) * 0.2;
                    const yPos = -(scrolled * speed * 0.05); // Reduce effect for smoother animation
                    // Only apply translateY if not already animated by section.visible
                    if (!element.closest('.section').classList.contains('visible')) {
                        element.style.transform = `translateY(${yPos}px)`;
                    } else {
                        element.style.transform = '';
                    }
                });
            });
        }

        // Smooth scroll for navigation
        function initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Page transition effects
        function initPageTransitions() {
            // Add transition overlay
            const transitionOverlay = document.createElement('div');
            transitionOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1a1a1a, #e8b4a0);
                z-index: 9999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.5s ease;
            `;
            document.body.appendChild(transitionOverlay);

            // Trigger transitions on navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    transitionOverlay.style.opacity = '1';
                    setTimeout(() => {
                        transitionOverlay.style.opacity = '0';
                    }, 300);
                });
            });
        }

        // Booking functionality
        function bookAppointment() {
            // Create booking modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: var(--primary-black);
                padding: 3rem;
                border-radius: 20px;
                border: 1px solid var(--rose-gold);
                max-width: 500px;
                width: 90%;
                text-align: center;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            `;

            modalContent.innerHTML = `
                <h3 style="color: var(--rose-gold); font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem;">Book Your Appointment</h3>
                <p style="color: var(--ivory); margin-bottom: 2rem;">Call us at <strong style="color: var(--rose-gold);">(555) 123-LUXE</strong> or visit us at our studio to schedule your transformation.</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="window.open('tel:+15551235893')" style="padding: 0.8rem 1.5rem; background: var(--rose-gold); color: var(--primary-black); border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">Call Now</button>
                    <button onclick="closeModal()" style="padding: 0.8rem 1.5rem; background: transparent; color: var(--rose-gold); border: 1px solid var(--rose-gold); border-radius: 10px; font-weight: 600; cursor: pointer;">Close</button>
                </div>
            `;

            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // Animate modal in
            setTimeout(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'scale(1)';
            }, 10);

            // Close modal function
            window.closeModal = function() {
                modal.style.opacity = '0';
                modalContent.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    delete window.closeModal;
                }, 300);
            };

            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    window.closeModal();
                }
            });
        }

        // Form submission
        function initFormSubmission() {
            const form = document.querySelector('.contact-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Animate submit button
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.style.opacity = '0.7';
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.opacity = '1';
                        submitBtn.style.background = 'linear-gradient(135deg, var(--rose-gold), var(--accent-gold))';
                        form.reset();
                    }, 2000);
                }, 1500);
            });
        }

        // Responsive handling
        function handleResize() {
            if (heroRenderer) {
                heroCamera.aspect = window.innerWidth / window.innerHeight;
                heroCamera.updateProjectionMatrix();
                heroRenderer.setSize(window.innerWidth, window.innerHeight);
            }
            
            if (carouselRenderer) {
                const canvas = document.getElementById('carousel-canvas');
                if (canvas) {
                    carouselCamera.aspect = canvas.clientWidth / canvas.clientHeight;
                    carouselCamera.updateProjectionMatrix();
                    carouselRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
                }
            }
        }

        // Navbar scroll effect
        function initNavbarScroll() {
            window.addEventListener('scroll', () => {
                const nav = document.querySelector('nav');
                if (window.scrollY > 100) {
                    nav.style.background = 'rgba(26, 26, 26, 0.98)';
                    nav.style.boxShadow = '0 2px 20px rgba(232, 180, 160, 0.1)';
                } else {
                    nav.style.background = 'rgba(26, 26, 26, 0.95)';
                    nav.style.boxShadow = 'none';
                }
            });
        }

        // Cursor trail effect
        function initCursorTrail() {
            const trail = [];
            const trailLength = 10;
            
            for (let i = 0; i < trailLength; i++) {
                const dot = document.createElement('div');
                dot.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: var(--rose-gold);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: ${(trailLength - i) / trailLength};
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(dot);
                trail.push(dot);
            }
            
            let mouseX = 0, mouseY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            function updateTrail() {
                trail.forEach((dot, index) => {
                    const delay = index * 50;
                    setTimeout(() => {
                        dot.style.left = mouseX + 'px';
                        dot.style.top = mouseY + 'px';
                    }, delay);
                });
                requestAnimationFrame(updateTrail);
            }
            
            updateTrail();
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', function() {
            initHero3D();
            setTimeout(initCarousel3D, 1000); // Delay to ensure DOM is ready
            initScrollAnimations();
            initParallax();
            initSmoothScroll();
            initPageTransitions();
            initFormSubmission();
            initNavbarScroll();
            initCursorTrail();
            
            window.addEventListener('resize', handleResize);
            
            // Add loading animation
            const loader = document.createElement('div');
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--primary-black);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease;
            `;
            
            loader.innerHTML = `
                <div style="text-align: center;">
                    <div style="width: 50px; height: 50px; border: 3px solid var(--rose-gold); border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
                    <p style="color: var(--rose-gold); font-family: 'Playfair Display', serif; font-size: 1.2rem;">Loading Luxe Experience...</p>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
            
            document.body.appendChild(loader);
            
            // Remove loader after initialization
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(loader);
                }, 500);
            }, 2000);
        });

        // Expose booking function globally
        window.bookAppointment = bookAppointment;
   