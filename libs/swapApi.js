module.exports = {
      responseStatus: (status, message) => {
            if(status){
                  return { status: true, data: message }
            } else {
                  return { status: false, data: message }
            }
      }
}