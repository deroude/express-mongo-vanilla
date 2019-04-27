import { User } from './user.model.mjs';
import bcrypt from 'bcrypt';

export function create(req, res) {
    const item = new User({ ...req.body, password: bcrypt.hashSync(req.body.password, 10) });
    const err = item.validateSync();
    if (err && err.errors) {
        res.status(400).send({ message: 'Invalid payload' });
    } else {
        item.save().then(data => res.send(data))
            .catch(err => {
                if (err.message.indexOf('duplicate key error') !== -1) {
                    res.status(409).send({ message: "Email already exists" });
                } else {
                    res.status(500).send({ message: err.message || 'Oops, server error' });
                }
            });
    }
}

export function findAll(req, res) {
    User.find().then(items => res.send(items))
        .catch(err => res.status(500).send({ message: err.message || 'Oops, server error' }));
}
export function update(req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Payload can not be empty"
        });
    }

    User.findByIdAndUpdate(req.params.id, req.body, { new: false })
        .then(item => {
            if (!item) {
                return res.status(404).send();
            }
            res.send(item);
        }).catch(err => res.status(500).send({ message: err.message || 'Oops, server error' }));
}

export function deleteById(req, res) {
    User.findByIdAndRemove(req.params.id)
        .then(item => {
            if (!item) {
                return res.status(404).send();
            }
            res.status(200).send();
        }).catch(err => res.status(500).send({ message: err.message || 'Oops, server error' }));
}