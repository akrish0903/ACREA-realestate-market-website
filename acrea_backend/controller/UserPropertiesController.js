const addPropertyController= async (req,res,next)=>{
    console.log("user properties route working")
    res.send("Property Added Success")
}


module.exports = {addPropertyController}