import Link from "next/link";
import { ISignInProps } from "./interfaces/iSignInProps";

export const SignIn = ({
  signInData,
  handleEmail,
  handlePassword,
  handleSubmit,
  isInvalidData,
}: ISignInProps): JSX.Element => (
  <form
    className="w-full md:h-screen flex justify-center items-center"
    onSubmit={handleSubmit}
  >
    <ul className="max-w-md flex flex-col gap-8 w-full p-12 rounded-2xl shadow-lg">
      <li className="form-item">
        <h1 className="form-header">Авторизация</h1>
      </li>
      <li className="form-item">
        <label className="text-sm" htmlFor="email">
          Электронная почта
        </label>
        <input
          className="input"
          id="email"
          type="email"
          value={signInData.email}
          onChange={handleEmail}
          required
          minLength={8}
          maxLength={60}
        />
      </li>
      <li className="form-item">
        <label className="text-sm" htmlFor="password">
          Пароль
        </label>
        <input
          className="input"
          id="password"
          type="password"
          value={signInData.password}
          onChange={handlePassword}
          required
          minLength={8}
          maxLength={30}
        />
      </li>
      {isInvalidData && (
        <li className="form-item">
          <div className="p-4 bg-red-100 rounded-xl">
            <p className="text-sm text-center">Введены неверные данные</p>
          </div>
        </li>
      )}
      <li className="form-item">
        <button className="button" type="submit">
          Войти
        </button>
      </li>
      <li className="form-item">
        <Link className="text-sm text-center" href="/sign-up">
          Зарегистрироваться
        </Link>
      </li>
    </ul>
  </form>
);
