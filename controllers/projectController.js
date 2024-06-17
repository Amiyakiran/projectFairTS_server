const projects = require("../model/projectSchema");


//logic to add project
exports.addProjectController = async(req,res)=>{
   
        console.log('inside the project controller');
        const userId = req.payload
        console.log(userId);
    
        const projectImage = req.file.filename
        console.log(projectImage);
    
        const {title,language,github,website,overview}= req.body
        console.log(`${title},${language},${github},${website},${overview},${projectImage},${userId}`);
    
      try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Project already Exist....Please add New project')
        }
        else{
            const newProject = new projects({
                title,language,github,website,overview,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
        
    
        
      } catch (err) {
         res.status(401).json(`request falied due to ${err}`)
      }
        
       
    
    
}

//logic to get home project
exports.homeProjectController = async(req,res)=>{
    try {
      const homeProject = await projects.find().limit(3)
      res.status(200).json(homeProject)
    } catch (err) {
       res.status(401).json(`Request failed due to ${err}`)
    }
}

//logic to get all project
exports.allProjectController = async(req,res)=>{
  const searchKey = req.query.search
  console.log(searchKey);

  const query ={
    language:{
      //regular expression , options:'i' - it removes case sensitive
      $regex:searchKey,$options:'i'
    }
  }

  try {
    const allProject = await projects.find(query)
    res.status(200).json(allProject)
  } catch (err) {
     res.status(401).json(`Request failed due to ${err}`)
  }
}

//logic to get user Project
exports.UserProjectController = async(req,res)=>{
    try {
      const userId = req.payload
      const userProject = await projects.find({userId})
      res.status(200).json(userProject)
    } catch (err) {
      res.status(401).json(`Request failed due to ${err}`)
    }
}

//logic to edit user project
exports.editUserProjectController = async(req,res)=>{
   const {id}= req.params
   const userId = req.payload
   const{title,language,github,website,overview,projectImage} = req.body
   const uploadedProjectImage = req.file?req.file.filename:projectImage


   try {
     const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImage:uploadedProjectImage,userId},{new:true})

     await updateProject.save()
     res.status(200).json(updateProject)
    
   } catch (err) {
     res.status(401).json(err)
   }

}

//logic to delete user project
exports.deleteUserProjectController = async(req,res)=>{
  const {id} = req.params
  try {
    const removeProject = await projects.findByIdAndDelete({_id:id})
    res.status(200).json(removeProject)
    
  } catch (err) {
    res.status(401).json(err)
  }
}