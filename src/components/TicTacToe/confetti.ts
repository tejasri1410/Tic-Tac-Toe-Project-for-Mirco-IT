
const confetti = () => {
  const colors = ["#9b87f5", "#ea384c", "#0EA5E9", "#F97316", "#10B981"];
  const numConfetti = 100;
  
  const createConfettiElement = () => {
    const confetti = document.createElement("div");
    const size = Math.floor(Math.random() * 10) + 5; // Random size between 5px and 15px
    
    // Styling the confetti piece
    confetti.style.position = "fixed";
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    confetti.style.zIndex = "1000";
    confetti.style.pointerEvents = "none";
    
    // Random starting position at the top of the screen
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = "0";
    
    // Add animation
    confetti.style.animation = `
      fall ${Math.random() * 3 + 2}s linear forwards,
      sway ${Math.random() * 2 + 3}s ease-in-out infinite alternate
    `;
    
    // Add keyframes for the animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fall {
        to { transform: translateY(100vh); opacity: 0; }
      }
      @keyframes sway {
        from { transform: translateX(-5px); }
        to { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(style);
    
    return confetti;
  };
  
  // Create and add confetti elements to the DOM
  for (let i = 0; i < numConfetti; i++) {
    const confettiElement = createConfettiElement();
    document.body.appendChild(confettiElement);
    
    // Remove the confetti element after animation completes
    setTimeout(() => {
      confettiElement.remove();
    }, 5000);
  }
};

export default confetti;
