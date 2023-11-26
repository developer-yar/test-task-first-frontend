import { ISignUpProps } from "./interfaces/iSignUpProps";

export const SignUp = ({
  signUpData,
  handleSurname,
  handleName,
  handleEmail,
  handlePassword,
  handleSubmit,
}: ISignUpProps): JSX.Element => (
  <form
    className="w-full md:h-screen flex justify-center items-center"
    onSubmit={handleSubmit}
  >
    <ul className="max-w-md flex flex-col gap-8 w-full p-12 rounded-2xl shadow-lg">
      <li className="form-item">
        <h1 className="form-header">Регистрация</h1>
      </li>
      <li className="form-item">
        <label className="text-sm" htmlFor="surname">
          Фамилия
        </label>
        <input
          className="input"
          id="surname"
          value={signUpData.surname}
          onChange={handleSurname}
          type="text"
          required
          minLength={2}
          maxLength={30}
        />
      </li>
      <li className="form-item">
        <label className="text-sm" htmlFor="name">
          Имя
        </label>
        <input
          className="input"
          id="name"
          type="text"
          value={signUpData.name}
          onChange={handleName}
          required
          minLength={2}
          maxLength={30}
        />
      </li>
      <li className="form-item">
        <label className="text-sm" htmlFor="email">
          Электронная почта
        </label>
        <input
          className="input"
          id="email"
          type="email"
          value={signUpData.email}
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
          value={signUpData.password}
          onChange={handlePassword}
          required
          minLength={8}
          maxLength={30}
        />
      </li>
      <li className="form-item">
        <button className="button" type="submit">
          Создать аккаунт
        </button>
      </li>
    </ul>
  </form>
);
