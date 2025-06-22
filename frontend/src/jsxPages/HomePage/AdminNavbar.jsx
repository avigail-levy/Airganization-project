import { useNavigate,Outlet, } from "react-router-dom";
const btnArr = [
  { label: 'לקוחות', path: 'admin/users' },
  { label: 'הזמנות', path: 'admin/orders' }
];
const AdminNavbar = () => {
  const navigate = useNavigate();
    return(
         <> 
         {btnArr.map((btn, index) => (
        <button key={index} 
        className="nav-btn"
        onClick={() => navigate(btn.path)}>
          {btn.label}
        </button>
      ))}
      </>);
                }
export default AdminNavbar;