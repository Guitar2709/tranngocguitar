import bcrypt from "bcryptjs";

// Mã hóa mật khẩu
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Kiểm tra mật khẩu nhập vào với mật khẩu đã mã hóa
export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
