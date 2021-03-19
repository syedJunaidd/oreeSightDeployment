const Token = require('./blackListTokens.model');
const { validationError, handleError, handle404 } = require('../../../components/errors');
const { SET_BLACK_LIST } = require('../../../auth/auth.service');

exports.create = (request, response) => {
    const newToken = request.body;
    console.log(newToken);
    Token.create(newToken, (error, data) => {
        // Token.find({}, (error, blackList) => {
        //     if (error) {
        //         return handleError(response, error);
        //     }
        //     SET_BLACK_LIST(blackList);
        // });
        if (error) return validationError(response, error);
        return response.status(201).json(data);
    });
}

exports.listTokens = (request, response) => {
    Token.find({}, (error, data) => {
        if (error) {
            return handleError(response, error);
        }
        return response.status(200).json(data);
    });
}

