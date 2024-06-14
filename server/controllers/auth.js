import User from '../models/user.js';
import bcrypt from 'bcrypt';

const signIn = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(400).json('Tài khoản không tồn tại');
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json('Sai mật khẩu');
      } else {
        return res.status(200).json(user);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const signUp = async (req, res) => {
  try {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        fullname: fullname,
        username: username,
        password: hashedPassword,
        role: 3,
      });

      await newUser.save();
      res.status(200).json(newUser);
    } else {
      res.status(400).json('Tên đăng nhập đã có người sử dụng');
    }
  } catch (e) {
    res.status(500).json(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    console.log({ username, oldPassword, newPassword });
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ username });

    // Kiểm tra xem mật khẩu cũ có đúng không
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(200).json({ message: 'Mật khẩu cũ không đúng' });
    }

    // Mã hóa mật khẩu mới và cập nhật trong cơ sở dữ liệu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Mật khẩu đã được cập nhật thành công' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật mật khẩu' });
  }
};

export { signIn, signUp, changePassword };
