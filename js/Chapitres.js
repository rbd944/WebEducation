function toggleChapter(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    const isOpen = content.style.display === 'block';
    content.style.display = isOpen ? 'none' : 'block';
    arrow.classList.toggle('open', !isOpen);
}
