const express = require('express');
const router = express.Router();

const user = require('../controllers/userController');
const client = require('../controllers/clientController');
const deal = require('../controllers/dealController');
const dealDetails = require('../controllers/dealDetailsController');
const payments = require('../controllers/paymentsController');

const { verifyToken } = require('../middleware/verifyToken');
const { verifyAdminRole } = require('../middleware/authMiddleware');

//Routes for users
router.get('/users', verifyToken, verifyAdminRole, user.getUsers);
router.post('/signup', user.addUser);
router.post('/login', user.loginUser);

//Routes for clients
router.get('/client', client.getAllClients);
router.post('/client', client.addClient);
router.put('/client', client.updateClient);
router.get('/names', client.getCompanyName);

//Routes for deals
router.post('/deals', deal.addDeal);
router.get('/deals', deal.getAllDeals);
router.get('/deals/:dealNo', deal.getDealByDealNo);
router.put('/deals/:dealNo', deal.updateDeal);
router.get('/dealNo', deal.getLatestDealNo);
router.get('/deal/:CompanyName', deal.getAllDealsbyCompanyName);

//Routes for deal details
router.post('/details', dealDetails.addDealDetail);
router.get('/details/:dealNo', dealDetails.getDealDetailsByDealNo);
router.put('/details/:dealNo', dealDetails.updateDealDetail);
router.get('/total/:dealNo', dealDetails.getTotalByDealNo);

//Routes for payments
router.post('/payments', payments.createPayment);
router.put('/payments', payments.updatePayment);
router.get('/payments', payments.getAllPayments);
router.get('/payments/:CompanyName', payments.getPaymentByCompany);

module.exports = router;
