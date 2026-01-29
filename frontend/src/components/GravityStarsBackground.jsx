import React, { useEffect, useRef, useState } from 'react';

const GravityStarsBackground = ({
    starsCount = 75,
    starsSize = 2,
    starsOpacity = 0.75,
    glowIntensity = 15,
    glowAnimation = 'ease',
    movementSpeed = 0.5,
    mouseInfluence = 200, // Increased default for better visibility
    mouseGravity = 'attract',
    gravityStrength = 0.5, // Adjusted for smooth physics
    starsInteraction = true,
    starsInteractionType = 'bounce',
    className,
    style,
    ...props
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });
    const particlesRef = useRef([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        // Initialize particles
        const particles = [];
        for (let i = 0; i < starsCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * movementSpeed,
                vy: (Math.random() - 0.5) * movementSpeed,
                size: Math.random() * starsSize + 1,
                originalSize: Math.random() * starsSize + 1,
                color: `rgba(255, 255, 255, ${starsOpacity})`,
                glow: glowIntensity
            });
        }
        particlesRef.current = particles;

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000, active: false };
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear but keep background transparent (managed by CSS)

            // Physics update
            particlesRef.current.forEach(p => {
                // Basic movement
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Mouse interaction
                if (mouseRef.current.active) {
                    const dx = mouseRef.current.x - p.x;
                    const dy = mouseRef.current.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouseInfluence) {
                        const forceDirectionX = dx / dist;
                        const forceDirectionY = dy / dist;
                        const force = (mouseInfluence - dist) / mouseInfluence;
                        const directionMultiplier = mouseGravity === 'attract' ? 1 : -1;

                        // Apply gravity force
                        const acceleration = force * gravityStrength * 0.05 * directionMultiplier;

                        p.vx += forceDirectionX * acceleration;
                        p.vy += forceDirectionY * acceleration;

                        // Optional: Glow increase near mouse
                        if (glowAnimation !== 'instant') {
                            // Simple visual feedback
                        }
                    }
                }

                // Friction/Damping to prevent infinite speed up
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Keep some minimum movement
                if (Math.abs(p.vx) < 0.1 && Math.abs(p.vy) < 0.1) {
                    p.vx += (Math.random() - 0.5) * 0.1;
                    p.vy += (Math.random() - 0.5) * 0.1;
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;

                // Glow effect - Optimized: Removed expensive shadowBlur
                // if (glowIntensity > 0) {
                //    ctx.shadowBlur = glowIntensity;
                //    ctx.shadowColor = "white";
                // }

                ctx.fill();
                // ctx.shadowBlur = 0; // Reset
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [dimensions, starsCount, starsSize, starsOpacity, glowIntensity, glowAnimation, movementSpeed, mouseInfluence, mouseGravity, gravityStrength]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)', // Deep space background
                ...style
            }}
            {...props}
        >
            <canvas ref={canvasRef} style={{ display: 'block' }} />
        </div>
    );
};

export default GravityStarsBackground;
