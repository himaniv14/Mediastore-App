import {Link} from 'react-router-dom';
function Sidebar(){
    return(
        <div className='card' >
            <div className='list-group list-group-flush'>
                <Link to='/userprofile' className='list-group-item list-group-item-action'> My Profile</Link>
                <Link to='/myposts' className='list-group-item list-group-item-action'> My Posts</Link>
                <Link to='/messages' className='list-group-item list-group-item-action'> My Messages</Link>
            </div>
        </div>
    )
}
export default Sidebar;