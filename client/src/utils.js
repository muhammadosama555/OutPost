
  
function normalDate(d) {
    var date = new Date(d)
return date.getDate() +  " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear()

  }
  
  export default normalDate