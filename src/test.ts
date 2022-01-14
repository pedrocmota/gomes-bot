import {env, smtp, isDev} from './index'

export const testG2G = async (product: string) => {
  smtp.sendMail({
    from: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    to: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    subject: '[G2G] New Sell Order #0000000',
    html: `
    <div dir="ltr"><div class="gmail_quote">Dear Victor,<br><br>You have a new sell order. Please prepare
    the items for delivery as soon as possible or click &quot;Chat Now&quot; in your order details page to contact the buyer for delivery arrangement.<br><br>Order Summary:<br>-------------------------------------------------------------- <br>Sell Order Number: 1234567<br>Sell Order Date: Tuesday, 26 October, 2021<br>E-mail Address: <a href="mailto:storetruefarmers@gmail.com" target="_blank">storetruefarmers@gmail.com</a><br><br><br>Products<br>--------------------------------------------------------------<br>${product}<br>--------------------------------------------------------------<br>Total: US $00.00<br><br>Status: New Order<br><b><a href="https://support.g2g.com/support/solutions/articles/5000001410" target="_blank">Order Flow</a> : [New Order] --&gt; [Preparing]
    --&gt; [Delivering] --&gt; [Delivered] --&gt; [Completed] or [Canceled]</b><br><br><a href="https://support.g2g.com/support/solutions/folders/5000007799" target="_blank">Read more</a> about selling at G2G and <a href="https://support.g2g.com/support/solutions/articles/5000001416" target="_blank">payment request schedule and fee.</a><br><br>G2G.com Team
    </div></div>
    `
  })
}

export const testPA = async (product: string) => {
  smtp.sendMail({
    from: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    to: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    subject: 'You Have a New Order - Order ID 0000000',
    html: `
    <span>Dear Mateus Cerqueira Mota,</span>

    <p>Congratulations! You just made a sale:</p>
    <p>Order:13 M Aion-Classic Kinah<br />
    Order ID: 8163620 <br />
    Order Link: <a href=3D"http://mailtrack.playerauctions.com/ls/click?upn=3DS=
    C9J-2BHuLH34JJ0-2BknMo-2BkaV-2BpiE1NaDrFtYcUdFN84qYm2s47XOHTwjnKPB2P7GXyNw5=
    uXcPAWAib-2BpE4PvWcUpz-2FVKOAsBpph6IPBwu6Uw-3D-AHk_IJwReN5SgpFs-2BkZ8j-2FAD=
    UR6I1QtY2oPtetBPmcMju4m40r7twwQ1JIByPwpvtwkkc5dZfp-2BCRPwqsOAEBxBgubuqWWurF=
    37lXRYlyArTcjxkavCOVmqL4pGFiWoXETbbqmydo3Z3qqnQo1IQAWGAEYn917ZKRtUFdrIpUe4M=
    qDLtrfDtt1GAh0hR3M084tPRea6u2mXEf0Z7DXdFaYz91TfiWx4tc5Ud3b0ZX2SDOeptKI4Yxr-=
    2FK-2FEbKemEF4fm0" target=3D"_blank">
    =09=09https://me.playerauctions.com/member/myorderdetail/?orderid=3D8163620=
    </a><br />
    Market: ${product}<br />
    Product Type: Teste </p>
    <p>Make sure to deliver on time and:<br/>
    1. RECORD YOUR SCREEN THROUGHOUT THE DELIVERY PROCESS<br/>

    It is strongly advised to record your screen during the entire process of d=
    elivery. There are many free browser extensions that allow you to record an=
    d then download the video easily. <br/>

    Screeny App (Chrome) <br/>
    Awesome Screenshot & Screen Recorder (Firefox) <br/>
    How to Record the Screen on Your Mac (Apple Users) <br/>

    If you have trouble recording your screen, take screenshots before, during,=
     and upon completion of the delivery process. <br/><br/>
     =20
    2. DELIVER TO THE RIGHT PERSON <br/>
    =20
    Make sure you are delivering to the exact same game character name shown on=
     the order detail page under the =E2=80=98Delivery Info=E2=80=99. Copy and =
    Paste the game character name to avoid typos and make sure to double-check =
    it before delivering. For Auction House trading, talk to the buyer via onsi=
    te messenger to make sure you are delivering to the right person.<br/>

    <p>Regards, </p>
    <p>The PlayerAuctions Team  <br />
    <a href=3D"http://mailtrack.playerauctions.com/ls/click?upn=3DSC9J-2BHuLH34=
    JJ0-2BknMo-2BkS-2Fwh2Kyc4A19cgM8pByZiV6DM9Kci5jzB-2Bfqxi71v3el3jB_IJwReN5Sg=
    pFs-2BkZ8j-2FADUR6I1QtY2oPtetBPmcMju4m40r7twwQ1JIByPwpvtwkkc5dZfp-2BCRPwqsO=
    AEBxBguSdTco6Ecbdu1RA-2BI7-2B8SNCTuMHUosvoNLzRpZmfO4us-2B5D-2BnBJ3bZHT9CZlu=
    5Rt5b8JiFCuoGnswvZoM7cIG0KkR89bFqeFOCG5jzL-2BAFLtvC-2FRGVKrgjXy1gyNoknHMonN=
    1RbTfIrgMHLam-2BydHhb9HkUc97jHN7eiOBpJK-2BgM">https://www.playerauctions.co=
    m</a> </p>
    `
  })
}

export const testP2PAH = async (product: string) => {
  smtp.sendMail({
    from: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    to: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    subject: '[P2PAH] New Sell Order #0000000000000000',
    html: `
    Dear ,

    You have a new sell order. Please prepare the items for delivery as soon as=
     possible or click "Chat Now" in your order details page to contact the buy=
    er for delivery arrangement.

    Order Summary:
    --------------------------------------------------------------
    Sell Order Number: 0000000000000000
    Sell Order Date: Saturday, 28 November, 2020
    E-mail Address: mateuscerqueira1@hotmail.com

    Products
    --------------------------------------------------------------
    ${product}
    --------------------------------------------------------------
    Total: US$00.00

    Status: New Order
    Order Flow : [New Order] --> [Preparing] --> [Delivering] --> [Delivered] -=
    -> [Completed] or [Canceled]

    Read more about selling at P2PAH and payment request schedule and fee.

    P2PAH.com Team

    --_000_RIZP284MB1452ADFD4702D13040F7CDBC8A539RIZP284MB1452BRAP_
    Content-Type: text/html; charset="iso-8859-1"
    Content-Transfer-Encoding: quoted-printable

    <html>
    <head>
    <meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3Diso-8859-=
    1">
    <style type=3D"text/css" style=3D"display:none;"> P {margin-top:0;margin-bo=
    ttom:0;} </style>
    </head>
    <body dir=3D"ltr">
    <div style=3D"font-family: Calibri, Helvetica, sans-serif; font-size: 12pt;=
     color: rgb(0, 0, 0);">
    <span style=3D"color: rgb(0, 0, 0); background-image: initial; background-p=
    osition: initial; background-size: initial; background-repeat: initial; bac=
    kground-attachment: initial; background-origin: initial; background-clip: i=
    nitial; font-family: Verdana; letter-spacing: 0px; font-size: 14px;">Dear
    </span><span style=3D"color: rgb(0, 0, 0); background-image: initial; backg=
    round-position: initial; background-size: initial; background-repeat: initi=
    al; background-attachment: initial; background-origin: initial; background-=
    clip: initial; font-family: Verdana; letter-spacing: 0px; font-size: 14px;"=
    >,</span><br>
    </div>
    <div>
    <div>
    <p><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px; ba=
    ckground:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)">You have a new sell order. Please prepare th=
    e items for delivery as soon as possible or click &quot;Chat Now&quot; in y=
    our order details page to contact the buyer
     for delivery arrangement.</span><span style=3D"font-family:Verdana; letter=
    -spacing:0; font-size:14px; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)">Order Summary:</span><span style=3D"font-fam=
    ily:Verdana; letter-spacing:0; font-size:14px; background:rgb(255,255,255)"=
    ><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)">--------------------------------------------=
    ------------------</span><span style=3D"font-family:Verdana; letter-spacing=
    :0; font-size:14px; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)">Sell Order Number: 2022011451100549</span><s=
    pan style=3D"font-family:Verdana; letter-spacing:0; font-size:14px; backgro=
    und:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)">Sell Order Date: Saturday, 28 November, 2020=
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)">E-mail Address:&nbsp;mateuscerqueira1@hotmai=
    l.com</span><span style=3D"font-family:Verdana; letter-spacing:0; font-size=
    :14px; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)">Products</span><span style=3D"font-family:Ve=
    rdana; letter-spacing:0; font-size:14px; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)">--------------------------------------------=
    ------------------</span><span style=3D"font-family:Verdana; letter-spacing=
    :0; font-size:14px; background:rgb(255,255,255)"><br>
    </span><strong><span style=3D"font-family:&#23435;&#20307;; color:rgb(255,0=
    ,0); letter-spacing:0; font-size:14px; background:rgb(255,255,255)"><span s=
    tyle=3D"font-family:&#23435;&#20307;">Aion Classic &gt; Siel-Elyos (M Kinah=
    )</span></span></strong><span style=3D"font-family:Verdana; letter-spacing:=
    0; font-size:14px; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)">--------------------------------------------=
    ------------------</span><span style=3D"font-family:Verdana; letter-spacing=
    :0; font-size:14px; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)">Total:
    </span><strong><span style=3D"font-family:&#23435;&#20307;; color:rgb(255,0=
    ,0); letter-spacing:0; font-size:14px; background:rgb(255,255,255)"><span s=
    tyle=3D"font-family:&#23435;&#20307;">US$34.77</span></span></strong><stron=
    g><span style=3D"font-family:Verdana; color:rgb(255,0,0); letter-spacing:0;=
     font-size:14px; background:rgb(255,255,255)"><br>
    </span></strong><span style=3D"font-family:Verdana; letter-spacing:0; font-=
    size:14px; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)">Status: New Order</span><span style=3D"font-=
    family:Verdana; letter-spacing:0; font-size:14px; background:rgb(255,255,25=
    5)"><br>
    </span><strong><span style=3D"text-decoration:underline"><span style=3D"fon=
    t-family:Verdana; color:rgb(30,84,148); letter-spacing:0; font-size:14px; b=
    ackground:rgb(255,255,255)">Order Flow</span></span></strong><strong><span =
    style=3D"font-family:Verdana; letter-spacing:0; font-size:14px; background:=
    rgb(255,255,255)">&nbsp;:
     [New Order] --&gt; [Preparing] --&gt; [Delivering] --&gt; [Delivered] --&g=
    t; [Completed] or [Canceled]</span></strong><span style=3D"font-family:Verd=
    ana; letter-spacing:0; font-size:14px; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)"><br>
    </span><span style=3D"text-decoration:underline"><span style=3D"font-family=
    :Verdana; color:rgb(30,84,148); letter-spacing:0; font-size:14px; backgroun=
    d:rgb(255,255,255)">Read more</span></span><span style=3D"font-family:Verda=
    na; letter-spacing:0; font-size:14px; background:rgb(255,255,255)">&nbsp;ab=
    out
     selling at </span><span style=3D"font-family:&#23435;&#20307;; letter-spac=
    ing:0; font-size:14px; background:rgb(255,255,255)">P2PAH</span><span style=
    =3D"font-family:Verdana; letter-spacing:0; font-size:14px; background:rgb(2=
    55,255,255)">&nbsp;and&nbsp;</span><span style=3D"text-decoration:underline=
    "><span style=3D"font-family:Verdana; color:rgb(30,84,148); letter-spacing:=
    0; font-size:14px; background:rgb(255,255,255)">payment
     request schedule and fee.</span></span><span style=3D"font-family:Verdana;=
     letter-spacing:0; font-size:14px; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:Verdana; letter-spacing:0; font-size:14px=
    ; background:rgb(255,255,255)"><br>
    </span><span style=3D"font-family:&#23435;&#20307;; letter-spacing:0; font-=
    size:14px; background:rgb(255,255,255)">P2PAH</span><span style=3D"font-fam=
    ily:Verdana; letter-spacing:0; font-size:14px; background:rgb(255,255,255)"=
    >.com Team</span></p>
    </div>
    </div>
    </body>
    </html>
    `
  })
}