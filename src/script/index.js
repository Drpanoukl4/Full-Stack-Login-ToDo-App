document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("add")
    const modalalert = document.getElementById("modal-alert")
    const table = document.getElementById("table")
    const alert = document.getElementById("alert")
    let description = document.getElementById("description")
    let title = document.getElementById("title")
    let modaltitle = document.getElementById("modal-title")
    let modaldescription = document.getElementById("modal-description")
    let modalbtn = document.getElementById("modal-btn")
    let id = 1;
    
    const Removetodo = (id) => {
    
    document.getElementById(id).remove()
    
    }


    const  edtodo = (id) => {


        modalbtn.onclick = () =>{

            title.value = modaltitle.value
            description.value = modaldescription.value

            if(title.value === "" || description.value === ""){

                modalalert.classList.remove("d-none")
                modalalert.innerText = ("Error : Fill all The Fields")

            }else{

                Addtodo() 
                document.getElementById(id).remove()
                $('#modal').modal("hide") 

            }            
        
        }
    }




    const Addtodo = () => {
    
        if(title.value === "" || description.value === ""){
            alert.classList.remove("d-none")
            alert.innerText = ("Error : Fill all The Fields")
            return
    
        }
            alert.classList.add("d-none")
            console.log("Ok")
            const row = table.insertRow()
            row.setAttribute("id", id++)
            row.innerHTML = `
            
            <td>${title.value}</td>
    
            <td>${description.value}</td>
            <td class="text-center">
                        <input type="checkbox">
            </td>
            <td class="text-right">
                
            </td>
            `
    
        //edit

    const abtn = document.createElement("button")
    abtn.classList.add("btn", "btn-primary", "mb-1")
    abtn.onclick = (e) => {

    $('#modal').modal("toggle")     
    edtodo(row.getAttribute("id"))
            
    }
    
    abtn.innerHTML = '<i class="fa fa-pencil"></i>'
    row.children[3].appendChild(abtn)

    
    //delete
    const rbtn = document.createElement("button")
    rbtn.classList.add("btn", "btn-danger", "mb-1", "ml-1")
    rbtn.onclick = (e) => {
    
    Removetodo(row.getAttribute("id"))
    
    }
    rbtn.innerHTML = '<i class="fa fa-trash"></i>'
    row.children[3].appendChild(rbtn)

    }
    
    btn.onclick = Addtodo;
    
    });