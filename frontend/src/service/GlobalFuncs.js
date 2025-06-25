const ifCurrentUser = (currentUser, navigate, setShowLoginPopup, path) => {
  if (!currentUser) {
    setShowLoginPopup(true);
  } else {
    navigate(path);
  }
};
export default ifCurrentUser;
