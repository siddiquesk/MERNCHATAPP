const express=require("express");
const router=express.Router({mergeParams:true});
const crudController=require("../Controller/crudController")

router.get("/",crudController.showChat);
router.post("/",crudController.createChats);
router.put("/:id",crudController.editChats);
router.delete("/:id",crudController.destroyChats );
module.exports=router;


