const ifCurrentUser = (currentUser, navigate, setShowLoginPopup, path) => {
  if (!currentUser) {
    console.log("currentUser", currentUser);
    console.log("לא מחובר, מציג פופאפ");
    setShowLoginPopup(true);
  } else {
    navigate(path);
  }
};
export default ifCurrentUser;
