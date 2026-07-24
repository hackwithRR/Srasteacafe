// Magnetic button effect
export const initMagneticButtons = () => {
  const magneticButtons = document.querySelectorAll<HTMLElement>('[data-magnetic]');
  
  magneticButtons.forEach((button) => {
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = button.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };
    
    const handleMouseLeave = () => {
      button.style.transform = "translate(0, 0)";
    };
    
    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
  });
};

// Ripple effect on buttons
export const initRippleEffect = () => {
  const rippleElements = document.querySelectorAll<HTMLElement>('.ripple');
  
  rippleElements.forEach((el) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--x', `${x}%`);
      el.style.setProperty('--y', `${y}%`);
    };
    
    el.addEventListener('mousemove', handleMouseMove);
  });
};

