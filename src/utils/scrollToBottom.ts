const scrollToBottom = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;

  window.scrollTo({
    top: documentHeight - windowHeight,
    behavior: 'smooth',
  });
};
export default scrollToBottom;
