// Mobile Navigation Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Network Animation
        const networkAnimation = document.getElementById('networkAnimation');
        const nodes = [];
        const connections = [];
        
        function createNetworkAnimation() {
            // Create nodes
            for (let i = 0; i < 15; i++) {
                const node = document.createElement('div');
                node.classList.add('node');
                
                // Random position within the animation container
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                
                node.style.left = `${x}%`;
                node.style.top = `${y}%`;
                
                networkAnimation.appendChild(node);
                nodes.push({element: node, x, y, dx: (Math.random() - 0.5) * 0.5, dy: (Math.random() - 0.5) * 0.5});
            }
            
            // Create connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const distance = Math.sqrt(
                        Math.pow(nodes[i].x - nodes[j].x, 2) + 
                        Math.pow(nodes[i].y - nodes[j].y, 2)
                    );
                    
                    // Connect nodes that are close enough
                    if (distance < 30) {
                        connections.push({node1: nodes[i], node2: nodes[j]});
                    }
                }
            }
            
            // Draw connections as lines
            connections.forEach(conn => {
                const line = document.createElement('div');
                line.classList.add('line');
                line.style.position = 'absolute';
                line.style.backgroundColor = 'rgba(0, 198, 255, 0.2)';
                line.style.height = '2px';
                line.style.transformOrigin = '0 0';
                
                networkAnimation.appendChild(line);
                
                // Store line element with connection
                conn.line = line;
            });
            
            // Start animation
            animateNetwork();
        }
        
        function animateNetwork() {
            // Update node positions
            nodes.forEach(node => {
                node.x += node.dx;
                node.y += node.dy;
                
                // Bounce off edges
                if (node.x <= 0 || node.x >= 100) node.dx *= -1;
                if (node.y <= 0 || node.y >= 100) node.dy *= -1;
                
                // Apply new position
                node.element.style.left = `${node.x}%`;
                node.element.style.top = `${node.y}%`;
            });
            
            // Update connection lines
            connections.forEach(conn => {
                const dx = conn.node2.x - conn.node1.x;
                const dy = conn.node2.y - conn.node1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Remove connections that are too far
                if (distance > 30) {
                    if (conn.line.parentNode) {
                        conn.line.parentNode.removeChild(conn.line);
                    }
                    return;
                }
                
                // Calculate line position and rotation
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                conn.line.style.left = `${conn.node1.x}%`;
                conn.line.style.top = `${conn.node1.y}%`;
                conn.line.style.width = `${distance}%`;
                conn.line.style.transform = `rotate(${angle}deg)`;
                
                // Adjust opacity based on distance
                const opacity = 0.6 * (1 - distance/30);
                conn.line.style.backgroundColor = `rgba(0, 198, 255, ${opacity})`;
            });
            
            requestAnimationFrame(animateNetwork);
        }
        
        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you for your message, ${name}! I'll get back to you soon at ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Initialize network animation when page loads
        window.addEventListener('load', createNetworkAnimation);
        
        // Timeline animation on scroll
        function animateTimelineOnScroll() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            timelineItems.forEach(item => {
                const itemPosition = item.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (itemPosition < screenPosition) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }
            });
        }
        
        // Set initial state for timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Animate timeline when page loads and on scroll
        window.addEventListener('load', () => {
            setTimeout(animateTimelineOnScroll, 300);
        });
        
        window.addEventListener('scroll', animateTimelineOnScroll);