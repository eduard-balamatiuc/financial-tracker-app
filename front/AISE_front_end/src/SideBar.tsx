interface SideBarProps {
    username: string,
    onPageChange: (page: string) => void,
    onClose: () => void,
    logOut: () => void,
}

function SideBar({username, onPageChange, onClose, logOut}: SideBarProps) {
  const changePage = (page: string) => {
    onPageChange(page);
    onClose();
  }

  return (
    <div className="side-bar">
        <div className="logo-and-username">
            <p className="user-name">{username}</p>
        </div>
        <div className="side-bar-options">
            <button className="page-link" onClick={() => changePage('home')}>Home</button>
            <button className="page-link" onClick={() => changePage('history')}>History</button>
            <button className="page-link" onClick={() => changePage('statistics')}>Statistics</button>
            {/* <button className="page-link" onClick={() => changePage('wallet')}>Wallet</button> */}
        </div>
        <button onClick={logOut}>Log out</button>
    </div>
  );
}

export default SideBar;
