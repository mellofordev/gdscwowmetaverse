from flask import Flask,render_template,jsonify

app = Flask(__name__,static_folder='static')

@app.route('/')
def home():
    bill_board = {
        1:["-1.133","https://www.coursejoiner.com/wp-content/uploads/2022/02/GDSC-WOW-2022.png","Wow sponsor"],
        2:["8.345","https://gdscwow.live/Assets/Images/Logo.png","Youtube"],
        3:["12.200","https://static01.nyt.com/images/2020/12/14/well/14google-photo/14google-photo-videoSixteenByNineJumbo1600.jpg","Google"]
        }
    location={0:["-0.939","Visakhapatnam","gdsc_wow_visakhapatnam","https://ik.imagekit.io/97pba3iyeh/wow_assets/vishakapathanam.jpg"],1:["0.043","Bhubaneshwar","gdscwow_bhubaneswar","https://ik.imagekit.io/97pba3iyeh/wow_assets/bhubaneswar.jpg"],2:["0.980","Delhi NCR","gdscwow_delhincr","https://ik.imagekit.io/97pba3iyeh/wow_assets/delhincr.jpg"]}
    return render_template('index.html',bill_board=bill_board,location=location)
@app.route('/map')
def map():
    return render_template('map.html')
@app.route('/location/<int:id>',methods=["GET"])
def location_api(id):
    location_set={
        1:{
            1:{"pos":"-0.939","name":"Nagpur","instagram":"gdscwow","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/vishakapathanam.jpg"},
            2:{"pos":"0.043","name":"Punjab","instagram":"wow.pb_","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/punjab.jpg"},
            3:{"pos":"0.980","name":"Udaipur","instagram":"gdscwowudaipur","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/udaipur.jpg"}
        },
        2:{
            1:{"pos":"-0.939","name":"Gujarat","instagram":"gdscwow_gujarat","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/gujarat.jpg"},
            2:{"pos":"0.043","name":"Mumbai","instagram":"gdscwowmumbai","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/mumbai.jpg"},
            3:{"pos":"0.980","name":"Pune","instagram":"gdsc.pune","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/pune.jpg"}
        },
        3:{
            1:{"pos":"-0.939","name":"Lucknow","instagram":"gdscwow_lucknow","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/lucknow.jpg"},
            2:{"pos":"0.043","name":"Jaipur","instagram":"gdscwowjaipur","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/jaipur.jpg"},
            3:{"pos":"0.980","name":"Kochi","instagram":"gdscwow_kochi","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/vishakapathanam.jpg"}
        },
        4:{
            1:{"pos":"-0.939","name":"Bangalore","instagram":"gdscwow_bangalore","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/bangalore.jpg"},
            2:{"pos":"0.043","name":"Kolkata","instagram":"gdscwow","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/vishakapathanam.jpg"},
            3:{"pos":"0.980","name":"Chennai","instagram":"gdscwowchennai","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/chennai.jpg"}
        },
        5:{
            1:{"pos":"-0.939","name":"Visakhapatnam","instagram":"gdsc_wow_visakhapatnam","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/vishakapathanam.jpg"},
            2:{"pos":"0.043","name":"Bhubaneshwar","instagram":"gdscwow_bhubaneswar","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/bhubaneswar.jpg"},
            3:{"pos":"0.980","name":"Delhi NCR","instagram":"gdscwow_delhincr","bg_url":"https://ik.imagekit.io/97pba3iyeh/wow_assets/delhincr.jpg"}
        },
    }
    try:
        return jsonify(location_set[id])
    except KeyError:
        return jsonify({1:"id not found"})

if __name__=='__main__':
    app.run()
