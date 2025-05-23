// Create particle effect
const particlesContainer = document.getElementById('particles-container');
const particleCount = 80;

// In a production app, you would use your actual API key
// For now, we're not making direct API calls due to CORS issues
// const FAL_API_KEY = "992adfd8-9123-4418-b4d9-fe886d31d29f:a422279feb32a9e288cfd88d6c06ec83";
// const FAL_API_URL = "https://api.fal.ai/text-to-image";

// Create particles
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size (small)
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Initial position
    resetParticle(particle);
    
    particlesContainer.appendChild(particle);
    
    // Animate
    animateParticle(particle);
}

function resetParticle(particle) {
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';
    
    return {
        x: posX,
        y: posY
    };
}

function animateParticle(particle) {
    // Initial position
    const pos = resetParticle(particle);
    
    // Random animation properties
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    // Animate with GSAP-like timing
    setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Move in a slight direction
        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30; // Move upwards
        
        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;
        
        // Reset after animation completes
        setTimeout(() => {
            animateParticle(particle);
        }, duration * 1000);
    }, delay * 1000);
}

// Mouse interaction
document.addEventListener('mousemove', (e) => {
    // Create particles at mouse position
    const mouseX = (e.clientX / window.innerWidth) * 100;
    const mouseY = (e.clientY / window.innerHeight) * 100;
    
    // Create temporary particle
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Small size
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Position at mouse
    particle.style.left = `${mouseX}%`;
    particle.style.top = `${mouseY}%`;
    particle.style.opacity = '0.6';
    
    particlesContainer.appendChild(particle);
    
    // Animate outward
    setTimeout(() => {
        particle.style.transition = 'all 2s ease-out';
        particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
        particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
        particle.style.opacity = '0';
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }, 10);
    
    // Subtle movement of gradient spheres
    const spheres = document.querySelectorAll('.gradient-sphere');
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
    
    spheres.forEach(sphere => {
        const currentTransform = getComputedStyle(sphere).transform;
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Generate button functionality
const generateBtn = document.querySelector('.button-1');
const searchInput = document.querySelector('.search');
const cards = document.querySelectorAll('.holographic-card');
const clearBtn = document.querySelector('.button-2');

// Sample text ideas for cards when user inputs text
const cardIdeas = [
    "Cosmic Nebula Design",
    "Flowing Abstract Waves",
    "Geometric Pattern Layout",
    "Minimalist Interface",
    "Futuristic Dashboard",
    "Neon Light Effects",
    "Liquid Morphing Shapes",
    "3D Rendered Elements",
    "Immersive VR Experience",
    "AI-Generated Artwork",
    "Holographic Interface",
    "Augmented Reality View",
    "Cyberpunk Theme",
    "Synthwave Aesthetic",
    "Bioluminescent Glow",
    "Dimensional Portals",
    "Neural Network Visualization",
    "Interactive Sound Waves",
    "Digital Terrain Map",
    "Particle System Flow"
];

// Function to generate and display images
async function generateImage(prompt, cardElement) {
    // Add loading indicator to the card
    const loader = document.createElement('div');
    loader.className = 'loader';
    cardElement.innerHTML = '';
    cardElement.appendChild(loader);
    
    try {
        // Due to CORS restrictions, we'll use a simulated response for demonstration
        // In a real application, you would need to:
        // 1. Set up a backend server to make API calls
        // 2. Or use a serverless function (e.g., Netlify Functions, Vercel Serverless)
        // 3. Or use FAL's JavaScript client if they provide one
        
        // Simulated API response delay (1-3 seconds)
        const delay = Math.random() * 2000 + 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Generate a placeholder image
        const width = 512;
        const height = 512;
        const placeholderUrl = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
        
        // Create image element and display it
        const img = document.createElement('img');
        img.src = placeholderUrl; // Using placeholder image service
        img.alt = prompt;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '15px';
        
        // Create title for the card
        const title = document.createElement('h2');
        title.textContent = prompt;
        title.style.position = 'absolute';
        title.style.bottom = '0';
        title.style.left = '0';
        title.style.right = '0';
        title.style.background = 'rgba(0, 0, 0, 0.7)';
        title.style.margin = '0';
        title.style.padding = '10px';
        title.style.fontSize = '0.9rem';
        title.style.borderBottomLeftRadius = '15px';
        title.style.borderBottomRightRadius = '15px';
        
        // Clear the card content first
        cardElement.innerHTML = '';
        
        // Add the image and title
        cardElement.appendChild(img);
        cardElement.appendChild(title);
        
        // Display a note about this being a placeholder
        const note = document.createElement('div');
        note.style.position = 'absolute';
        note.style.top = '10px';
        note.style.right = '10px';
        note.style.background = 'rgba(0, 0, 0, 0.6)';
        note.style.padding = '5px 8px';
        note.style.borderRadius = '4px';
        note.style.fontSize = '0.7rem';
        note.style.color = 'rgba(255, 255, 255, 0.8)';
        note.textContent = 'Demo mode';
        cardElement.appendChild(note);
        
    } catch (error) {
        console.error("Error generating image:", error);
        
        // Display error message in the card
        cardElement.innerHTML = `
            <h2 style="color: #ff3a3a">Error generating image</h2>
            <p style="color: white; font-size: 0.8rem; padding: 10px;">${error.message}</p>
        `;
    }
}

// Generate functionality
generateBtn.addEventListener('click', async () => {
    const userInput = searchInput.value.trim();
    
    if (userInput) {
        // Disable generate button during processing
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        
        // Process each card
        for (let i = 0; i < cards.length; i++) {
            const randomIdea = cardIdeas[Math.floor(Math.random() * cardIdeas.length)];
            const prompt = `${userInput} ${randomIdea}`;
            
            // Generate image for this card (with a slight delay between each to avoid rate limits)
            await new Promise(resolve => setTimeout(resolve, i * 500));
            generateImage(prompt, cards[i]);
        }
        
        // Re-enable button after all processing
        setTimeout(() => {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate';
        }, cards.length * 500);
    }
});

// Clear button functionality
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    cards.forEach(card => {
        card.innerHTML = '';
    });
});