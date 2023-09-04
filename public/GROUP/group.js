let token = localStorage.getItem('token')
const selectedUsers = [];
let rootAdmin = localStorage.getItem('rootAdmin')
  document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault()
    let users;
    try{
    let {data} = await axios.get('http://16.170.218.137/user/all',{headers:{"Authorization":token}})
    users = data.response
    }catch(err){
      console.err(err)
    }
    let ul = document.getElementById('userList')
    users.map( user => {
    let li = document.createElement('li')
    li.setAttribute('class','list-group-item bg-dark text-secondary')
    li.setAttribute('data-user',`${user.id}`)
    li.appendChild(document.createTextNode(`${user.name}`)) 
    ul.appendChild(li)
    })

    const addUsersBtn = document.getElementById('createBtn');
    const userItems = document.querySelectorAll('.list-group .list-group-item');

       userItems.forEach((userItem) => {
      userItem.addEventListener('click', () => {
        const userId = userItem.dataset.user;
        // Toggle user selection
        if (selectedUsers.includes(userId)) {
          const index = selectedUsers.indexOf(userId);
          selectedUsers.splice(index, 1);
          userItem.classList.remove('active');
        } else {
          selectedUsers.push(userId);
          userItem.classList.add('active');
        }
      });
    });

    addUsersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let subjectName = document.getElementById('subject').value 
      let groupDetails = {
        name:subjectName,
        users:selectedUsers
      }
      postGroupDetails(groupDetails)
      // Reset selectedUsers array after adding them to the group
      selectedUsers.length = 0;
      userItems.forEach((userItem) => {
        userItem.classList.remove('active');
      });
      document.getElementById('subject').value =""
      alert('Group created')
       location.assign('../CHAT/chat.html')
    });
  });

  async function postGroupDetails(groupDetails){
    console.log('details...',groupDetails)
    try{
    const response = await axios.post('http://16.170.218.137/group/create',groupDetails,{headers:{"Authorization":token}})    
    }catch(err){
      console.err('err',err)
    }
  }
  
