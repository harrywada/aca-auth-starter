module.exports = {
  auth: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }

    return res.redirect("/login");
  }
}
