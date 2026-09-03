let t_t=0
let r_t=0
let t_t_input=document.createElement('p')
let r_t_input=document.createElement('p')
let tasks=[]
let categories = []
let retrieve_categories = localStorage.getItem('categories')
categories = JSON.parse(retrieve_categories) || []
function remain_after_refreshed(){
 let retrieve=localStorage.getItem('task_input')
 tasks= JSON.parse(retrieve) || []
 for (let [index,task] of tasks.entries()){
    let new_div = document.createElement('div')
    let check_box = document.createElement('input')
    check_box.type='checkbox'
    let task_element = document.createElement('span')
    task_element.textContent=task.text
    let index_element=document.createElement('span')
    index_element.textContent=index
    if (task.completed === true) {
     check_box.checked = true
     task_element.style.textDecoration = 'line-through'
    }
    let delete_button=document.createElement('button')
    delete_button.textContent='Delete'
    let edit_button=document.createElement('button')
    edit_button.textContent='Edit'
    let save_edit_button=document.createElement('button')
    save_edit_button.textContent='Save edit'
    let container= document.querySelector('.task_container')
    let pr_dropdown=document.createElement('select')
    let high_option=document.createElement('option')
    high_option.value='High'
    high_option.textContent='🔴 High'
    let med_option=document.createElement('option')
    med_option.textContent='🟡 Medium'
    med_option.value='Medium'
    let low_option=document.createElement('option')
    low_option.value='Low'
    low_option.textContent='🟢 Low'
    pr_dropdown.appendChild(high_option)
    pr_dropdown.appendChild(med_option)
    pr_dropdown.appendChild(low_option)
    let category_dropdown=document.createElement('select')
    for (let category_data of categories){
      let category = document.createElement('option')
      category.value = category_data
      category.textContent = category_data
      category_dropdown.appendChild(category)
    }
    category_dropdown.value=task.category
    

    new_div.appendChild(check_box)
    new_div.appendChild(index_element)
    new_div.appendChild(task_element)
    new_div.appendChild(pr_dropdown)
    new_div.appendChild(category_dropdown)
    new_div.appendChild(edit_button)
    new_div.appendChild(save_edit_button)
    new_div.appendChild(delete_button)
    
    container.appendChild(new_div)
    let main=document.querySelector('.main')
    t_t_input.textContent='Total tasks: '+t_t
    r_t_input.textContent='Remaining tasks: '+r_t
    main.append(t_t_input)
    main.append(r_t_input)
    
    t_t++
    if (task.completed === false){
      r_t++  
    }
    
    t_t_input.textContent='Total tasks: '+t_t
    r_t_input.textContent='Remaining tasks: '+r_t
    check_box.addEventListener("change",function(){
        let checked=check_box.checked
      
        if (checked){
            task_element.style.textDecoration='line-through'
            r_t--
            t_t_input.textContent='Total tasks: '+t_t
            r_t_input.textContent='Remaining tasks: '+r_t
            if (r_t == 0){
              r_t_input.textContent='No tasks remaining'
            }
            check_box.checked=true
            task.completed=true
            let conversion=JSON.stringify(tasks)
            let saves= localStorage.setItem('task_input',conversion)
        
        }
        else{
            task_element.style.textDecoration='none'
            r_t++
            t_t_input.textContent='Total tasks: '+t_t
            r_t_input.textContent='Remaining tasks: '+r_t
            if (r_t == 0){
               r_t_input.textContent='No tasks remaining'
            }
            check_box.checked=false
            task.completed=false
            let conversion=JSON.stringify(tasks)
            let saves= localStorage.setItem('task_input',conversion)
        }
        
    });
    
    delete_button.addEventListener('click',function(){
        delete_button.parentElement.remove()
        let result=tasks.findIndex(function(item){
            return item === task

        })
        tasks.splice(result,1)
        let conversion=JSON.stringify(tasks)
        let saves= localStorage.setItem('task_input',conversion)
        t_t--
        t_t_input.textContent='Total tasks: '+t_t
        r_t_input.textContent='Remaining tasks: '+r_t
        if (t_t ==0){
            r_t=t_t
            r_t_input.textContent='Remaining tasks: '+r_t
        }
        if (r_t == 0){
          r_t_input.textContent='No tasks remaining'
        }
        
        
    });

    let input=document.querySelector("#task_input")
    let editing_element=document.createElement('p')
    edit_button.addEventListener('click',function(){
      display_text= "Editing: "+task.text
      editing_element.textContent=display_text
      let main =document.querySelector('.main')
      main.appendChild(editing_element)
      
      input.value=task.text
      
      
    });
    save_edit_button.addEventListener('click',function(){
    tasks[index].text = input.value 
      task_element.textContent=tasks[index].text
      
      let conversion = JSON.stringify(tasks)
      localStorage.setItem('task_input', conversion)
      editing_element.remove()
    });
   pr_dropdown.value = task.pr_level
   pr_dropdown.addEventListener('change',function(){
        let selected_priority=pr_dropdown.value
        task['pr_level']=selected_priority
        

        let conversion = JSON.stringify(tasks)
        localStorage.setItem('task_input', conversion)
    })
    category_dropdown.addEventListener('change', function(){
      
      let selected_category = category_dropdown.value
      task['category'] = selected_category

      let conversion = JSON.stringify(tasks)
      localStorage.setItem('task_input', conversion)
    })  
    category_dropdown.value=task.category
  } 
}
function add_task(){
    let input=document.querySelector("#task_input")
    let task_input=input.value
     if(task_input.trim()===''){
      return;
    };
    let tasks_data={}
    tasks_data['text']=task_input
    tasks_data['completed']=false
    tasks_data['pr_level']="Medium"
    tasks.push(tasks_data)
    
    
    //for(let task of tasks){
    let new_div=document.createElement('div')
    let check_box=document.createElement('input')
    check_box.type='checkbox'
    let container= document.querySelector('.task_container')
    let task=document.createElement('span') 
    let delete_button=document.createElement('button')
    delete_button.textContent='Delete'
    task.textContent=task_input
    let edit_button=document.createElement('button')
    edit_button.textContent='Edit'
    let save_edit_button=document.createElement('button')
    save_edit_button.textContent='Save edit'
    let pr_dropdown=document.createElement('select')
    let high_option=document.createElement('option')
    high_option.textContent='🔴 High'
    let med_option=document.createElement('option')
    med_option.textContent='🟡 Medium'
    let low_option=document.createElement('option')
    low_option.textContent='🟢 Low'
    pr_dropdown.appendChild(high_option)
    pr_dropdown.appendChild(med_option)
    pr_dropdown.appendChild(low_option)
    let category_dropdown=document.createElement('select')
    if (categories.length === 0) {
      let category = document.createElement('option')
      category.value = 'No categories added yet'
      category.textContent = 'No categories added yet'
      category_dropdown.appendChild(category)
    }
    else {
       for (let category_data of categories) {
        let category = document.createElement('option')
        category.value = category_data
        category.textContent = category_data
        category_dropdown.appendChild(category)
       }
     }
    let add_category_button=document.createElement('button')
    add_category_button.textContent='Add category'
    let delete_category_button=document.createElement('button')
    delete_category_button.textContent=' Delete category'
    new_div.appendChild(check_box)
    new_div.appendChild(task)
    new_div.appendChild(pr_dropdown)
    new_div.appendChild(category_dropdown)
    new_div.appendChild(add_category_button)
    new_div.appendChild(delete_category_button)
    new_div.appendChild(edit_button)
    new_div.appendChild(save_edit_button)
    new_div.appendChild(delete_button)
    
    container.appendChild(new_div)
    let selected_priority=pr_dropdown.value
    tasks_data['pr_level']=selected_priority
    let conversion=JSON.stringify(tasks)
    let saves= localStorage.setItem('task_input',conversion)
    let main=document.querySelector('.main')
    t_t_input.textContent='Total tasks: '+t_t
    r_t_input.textContent='Remaining tasks: '+r_t
    main.append(t_t_input)
    main.append(r_t_input)
    
    t_t++
    r_t++
    t_t_input.textContent='Total tasks: '+t_t
    r_t_input.textContent='Remaining tasks: '+r_t
    check_box.addEventListener("change",function(){
        let checked=check_box.checked
        if (checked){
            task.style.textDecoration='line-through'
            r_t--
            t_t_input.textContent='Total tasks: '+t_t
            r_t_input.textContent='Remaining tasks: '+r_t
            if (r_t == 0){
              r_t_input.textContent='No tasks remaining'
            }
            tasks_data.completed=true;
            let conversion=JSON.stringify(tasks)
            let saves= localStorage.setItem('task_input',conversion)
        }
        else{
            task.style.textDecoration='none'
            r_t++
            t_t_input.textContent='Total tasks: '+t_t
            r_t_input.textContent='Remaining tasks: '+r_t
            if (r_t == 0){
               r_t_input.textContent='No tasks remaining'
            }
            tasks_data.completed=false;
            let conversion=JSON.stringify(tasks)
            let saves= localStorage.setItem('task_input',conversion)
        }
    });
    delete_button.addEventListener('click',function(){
        delete_button.parentElement.remove()
        let result=tasks.findIndex(function(item){
            return item === tasks_data

        })
        tasks.splice(result,1)
        let conversion=JSON.stringify(tasks)
        let saves= localStorage.setItem('task_input',conversion)
        t_t--
        t_t_input.textContent='Total tasks: '+t_t
        r_t_input.textContent='Remaining tasks: '+r_t
        
        if (t_t ==0){
            r_t=t_t
            r_t_input.textContent='Remaining tasks: '+r_t
        }
        if (r_t == 0){
          r_t_input.textContent='No tasks remaining'
        }
        
    });
    
    input.value=''
    //}

    let editing_element = document.createElement('p')
    edit_button.addEventListener('click', function(){
      display_text = "Editing: " + task.textContent
      editing_element.textContent = display_text
      let main = document.querySelector('.main')
      main.appendChild(editing_element)
     
     input.value = task.textContent
    })
    save_edit_button.addEventListener('click', function(){
        tasks_data.text = input.value
        tasks.textContent = tasks_data.text

        let conversion = JSON.stringify(tasks)
        localStorage.setItem('task_input', conversion)

        editing_element.remove()
    })
    pr_dropdown.addEventListener('change',function(){
        let selected_priority=pr_dropdown.value
        tasks_data['pr_level']=selected_priority
        

        let conversion = JSON.stringify(tasks)
        localStorage.setItem('task_input', conversion)
    })
    category_dropdown.addEventListener('change', function(){
      
      let selected_category = category_dropdown.value
      tasks_data['category'] = selected_category

      let conversion = JSON.stringify(tasks)
      localStorage.setItem('task_input', conversion)
    })  
    
  add_category_button.addEventListener('click', function(){
    let category_input = document.createElement('input')
    category_input.id = 'category_input'
    let main = document.querySelector('.main')
    main.appendChild(category_input)

    let save_category_btn = document.createElement('button')
    save_category_btn.textContent = 'Save the category'
    main.appendChild(save_category_btn)

    save_category_btn.addEventListener('click', function(){
        let category_data = category_input.value
        
       let new_category_data = category_data.trim()
        if (new_category_data==='' ||  categories.includes(new_category_data)){
          return
        }
        
        categories.push(new_category_data)

        let conversion = JSON.stringify(categories)
        localStorage.setItem('categories', conversion)

        category_input.remove()
        save_category_btn.remove()
    })
  })
   delete_category_button.addEventListener('click',function(){
    let delete_category_input=document.createElement('input')
    delete_category_input.id='delete_category'
    let main=document.querySelector('.main')
    main.appendChild(delete_category_input)

    let delete_c_b=document.createElement('button')
    delete_c_b.textContent='Delete the category'
    main.appendChild(delete_c_b)

    delete_c_b.addEventListener('click',function(){
      let category_data=delete_category_input.value
      categories.pop(category_data)

      let conversion = JSON.stringify(categories)
      localStorage.setItem('categories', conversion)
      
      delete_category_input.remove()
      delete_c_b.remove()
    })
   }) 
  
}
remain_after_refreshed()