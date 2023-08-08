let token = localStorage.getItem('token')
const selectedUsers = [];
  document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault()
    // find all user  using axios.get()
    let users;
    try{
    let {data} = await axios.get('http://localhost:3003/user/all',{headers:{"Authorization":token}})
    console.log('resp--',data)
    users = data.response
    }catch(err){
      console.log('err',err)
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
    console.log('uitem',userItems)
   

    userItems.forEach((userItem) => {
      userItem.addEventListener('click', () => {
        const userId = userItem.dataset.user;
        console.log('uid',userItem.dataset)
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
      console.log('subjectName',subjectName)
      console.log('Selected Users:',selectedUsers);
      let groupDetails = {
        name:subjectName,
        users:selectedUsers
      }
      postGroupDetails(groupDetails)
      // Reset selectedUsers array after adding them to the group
      selectedUsers.length = 0;
      //location.assign('chat2.html')
      userItems.forEach((userItem) => {
        userItem.classList.remove('active');
      });
      document.getElementById('subject').value =""
      alert('Group created')
      window.history.back();
    });
  });

  async function postGroupDetails(groupDetails){
    console.log('details...',groupDetails)
    try{
    const response = await axios.post('http://localhost:3003/group/create',groupDetails,{headers:{"Authorization":token}})
    console.log('resp1',response)      
    }catch(err){
      console.log('err',err)
    }
    // if(!err){
    //   alert('Group created')
    // }
   
  }
