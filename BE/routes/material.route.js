import express from 'express';
import MaterialController from '../controllers/material.controller.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const routeMaterial = express.Router()

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir) // Lưu vào thư mục 'uploads/' ở root dự án
  },
  filename: function (req, file, cb) {
    // Đổi tên file để tránh trùng lặp: timestamp - tên gốc
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

routeMaterial.post('/', upload.single('content'), MaterialController.createMaterial);routeMaterial.get('/', MaterialController.getAllMaterials)
routeMaterial.get('/meeting/:meetingId', MaterialController.getMaterialsByMeeting)
routeMaterial.put('/:id', MaterialController.updateMaterial)
routeMaterial.delete('/:id', MaterialController.deleteMaterial)

export default routeMaterial