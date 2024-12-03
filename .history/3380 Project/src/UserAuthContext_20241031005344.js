const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});


  return (
    userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}
export function useUserAuth() {
  const Signup = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    let navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        await signUp(email, password);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    };
  }
  return useContext(userAuthContext);
}