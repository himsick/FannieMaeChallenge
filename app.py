
# Import flask and datetime module for showing date and time
from flask import Flask
 
# Initializing flask app
app = Flask(__name__)
 
 
# Route for seeing a data
@app.route('/members')
def members():
 
    # Returning an api for showing in  reactjs
    return {"members": ["Member1", "Member2", "Member3"]}

 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True, port=5173)