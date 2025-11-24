
export const authMiddleware = (req, res, next) => {
  try{
    const authHeader = req.headers.authorization ;
    if(!authHeader || !authHeader.startsWith("Bearer ")) throw new Error("Chua dang nhap");
    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Chua dang nhap");
    const payload = verifyToken(token) ;
    req.user = payload;
    next();
  }
  catch(error){
    res.status(401).json({message: error.message})
  }
}

const verifyToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
}
