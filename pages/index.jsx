import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Button,
  TextField,
  Box,
  Container,
} from "@mui/material"
import {createContext, useContext, useState} from "react"

// const rand = (min, max) => Math.random() * (max - min) + min

// const useV = () => {
//   const [v, sv] = useState(0)

//   useEffect(() => {
//     setInterval(() => sv(rand(100, 400)), 1000)
//   }, [])

//   return v
// }

const Context = createContext()

const letters = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "+",
  "-",
  "*",
  "/",
  "**",
  ".",
  "=",
  "C",
  "D",
]

const Display = () => {
  const [expression, setExpression, error] = useContext(Context)

  return (
    <TextField
      sx={{gridArea: "output"}}
      onInput={(ev) => {
        if (!ev.target.value) return setExpression("")

        if (letters.includes(ev.target.value.slice(-1)))
          setExpression(ev.target.value)
      }}
      inputMode="numeric"
      value={expression}
      error={!!error.trim()}
      placeholder="Введите здесь"
      helperText={error}
    />
  )
}

const CalcButton = ({letter}) => {
  const [, setExpression, error, setError, shouldDelete, setShouldDelete] =
    useContext(Context)

  return (
    <Button
      sx={{fontSize: 20, gridArea: "b" + letters.indexOf(letter)}}
      onClick={() => {
        if (error) setError(" ")

        switch (letter) {
          case "C":
            setExpression((p) => p.slice(0, -1))
            break
          case "D":
            setExpression("")
            break
          case "=":
            setExpression((p) => {
              try {
                if (p) {
                  let result = String(eval(p).toFixed(4))
                  if (result != "Infinity") {
                    setShouldDelete(true)
                    return result
                  }
                }
              } catch {}

              setError("Неверное выражение")
              return p
            })
            break
          default:
            setShouldDelete(false)
            setExpression((p) => {
              return (Number(letter) && shouldDelete ? "" : p) + letter
            })
        }
      }}
    >
      {letter}
    </Button>
  )
}

const Comp = () => {
  const [expression, setExpression] = useState("")
  const [error, setError] = useState(" ")
  const [shouldDelete, setShouldDelete] = useState("")
  // const v = useV()

  return (
    <Context.Provider
      value={[
        expression,
        setExpression,
        error,
        setError,
        shouldDelete,
        setShouldDelete,
      ]}
    >
      <Container
        maxWidth="xs"
        sx={
          {
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
          }
        }
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(5, 1fr)",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateAreas: `
            "output output output output output"
            "b10 b11 b12 b13 b14"
            "b15 b17 b18 b16 b16"
            "b0  b1  b2  b3  b4"
            "b5  b6  b7  b8  b9"
          `,
          }}
        >
          <Display />
          {letters.map((letter) => (
            <CalcButton key={letter} letter={letter} />
          ))}
        </Box>
      </Container>
    </Context.Provider>
  )
}

const Page = () => (
  <ThemeProvider theme={createTheme({palette: {mode: "dark"}})}>
    <CssBaseline />
    <Comp />
  </ThemeProvider>
)

export default Page
