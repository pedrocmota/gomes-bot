import {env, smtp} from './index'

export const testMail = async () => {
  smtp.sendMail({
    from: env.EMAIL_USER,
    to: env.EMAIL_USER,
    subject: '[G2G] New Sell Order #0000000',
    html: `
    <div dir="ltr"><div class="gmail_quote">Dear Victor,<br><br>You have a new sell order. Please prepare
    the items for delivery as soon as possible or click &quot;Chat Now&quot; in your order details page to contact the buyer for delivery arrangement.<br><br>Order Summary:<br>-------------------------------------------------------------- <br>Sell Order Number: 1234567<br>Sell Order Date: Tuesday, 26 October, 2021<br>E-mail Address: <a href="mailto:storetruefarmers@gmail.com" target="_blank">storetruefarmers@gmail.com</a><br><br><br>Products<br>--------------------------------------------------------------<br>Jogo Teste &gt; US &gt; Teste - US East (Moeda Teste)<br>--------------------------------------------------------------<br>Total: US $00.00<br><br>Status: New Order<br><b><a href="https://support.g2g.com/support/solutions/articles/5000001410" target="_blank">Order Flow</a> : [New Order] --&gt; [Preparing]
    --&gt; [Delivering] --&gt; [Delivered] --&gt; [Completed] or [Canceled]</b><br><br><a href="https://support.g2g.com/support/solutions/folders/5000007799" target="_blank">Read more</a> about selling at G2G and <a href="https://support.g2g.com/support/solutions/articles/5000001416" target="_blank">payment request schedule and fee.</a><br><br>G2G.com Team
    </div></div>
    `
  })
}