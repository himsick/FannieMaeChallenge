
# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)
 
 
# Route for seeing a data
@app.route('/data')
def data():
 
    # Returning an api for showing in  reactjs
    return {"data": ["data1", "data2", "data3"]}

 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True, port=5173)