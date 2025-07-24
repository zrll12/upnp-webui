import Cookies from "js-cookie";
import { useMessage } from "naive-ui";
import { onMounted, reactive } from "vue";

export interface UserInfo {
  username: string;
  available: boolean;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface UseUserFrontendReturn {
  userInfo: UserInfo;
  login: (loginForm: LoginForm) => Promise<void>;
  logout: () => void;
}

export function useUserFrontend(): UseUserFrontendReturn {
  const message = useMessage();

  const userInfo = reactive<UserInfo>({
    username: "",
    available: false,
  });

  onMounted(() => {
    const token = Cookies.get("token");
    const username = Cookies.get("username");

    if (token && username) {
      userInfo.username = username;
      userInfo.available = true;
    }
  });

  const login = async (loginForm: LoginForm): Promise<void> => {
    if (loginForm.username === "" || loginForm.password === "") {
      message.error("请填写用户名和密码");
      return;
    }

    try {
      const response: { token: string; username: string } = await $fetch(
        "/api/user",
        {
          method: "POST",
          body: loginForm,
        },
      );

      const expiresIn = 15;
      Cookies.set("token", response.token, { expires: expiresIn });
      Cookies.set("username", response.username || loginForm.username, {
        expires: expiresIn,
      });

      userInfo.username = response.username || loginForm.username;
      userInfo.available = true;

      message.success("登录成功");

      return;
    } catch (error: any) {
      const errorMessage =
        error.statusCode === 4011 ? "用户不存在" : "用户名或密码错误";
      message.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("username");

    userInfo.username = "";
    userInfo.available = false;

    message.success("已登出");
  };

  return {
    userInfo,
    login,
    logout,
  };
}
