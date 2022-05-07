
export default function useLogOut() {
    
     localStorage.removeItem('admin');
       window.location.replace("/admin/login");
     
    
  };