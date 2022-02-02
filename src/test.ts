import {env, smtp, isDev} from './index'
import {randomID, randomPrice} from './utils'
import {
  G2GOrderHTML,
  G2GCancelHTML,
  G2GConfirmationHTML,
  PAOrderHTML,
  P2PAHOrderHTML
} from './htmls'

export const testG2G = async (product: string) => {
  smtp.sendMail({
    from: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    to: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    subject: `[G2G] New Sell Order #${randomID(7)}`,
    html: G2GOrderHTML(product, randomPrice())
  })
}

export const testPA = async (product: string) => {
  smtp.sendMail({
    from: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    to: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    subject: `You Have a New Order - Order ID ${randomID(7)}`,
    html: PAOrderHTML(product)
  })
}

export const testP2PAH = async (product: string) => {
  smtp.sendMail({
    from: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    to: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    subject: `[P2PAH] New Sell Order #${randomID(16)}`,
    html: P2PAHOrderHTML(product, randomPrice())
  })
}

export const testG2GCancel = (orderID: string) => {
  smtp.sendMail({
    from: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    to: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    subject: `Your sell order ${orderID} has been cancelled.`,
    html: G2GCancelHTML(orderID)
  })
}

export const testG2GConfirmation = (orderID: string) => {
  smtp.sendMail({
    from: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    to: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
    subject: `[G2G] Your service fee statement for sold order #${orderID}`,
    html: G2GConfirmationHTML(orderID)
  })
}