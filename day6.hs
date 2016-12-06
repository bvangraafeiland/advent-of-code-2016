module Main where
import qualified Data.Map as Map
import Data.List

getCode :: [String] -> String
getCode messageLines = map mostOccurringCharacter $ linesToColumns messageLines

linesToColumns :: [String] -> [String]
linesToColumns = transpose

mostOccurringCharacter :: String -> Char
mostOccurringCharacter string = character
    where (character, _) = maximumBy (\(_, length1) (_, length2) -> compare length1 length2) $ map (\x -> (head x, length x)) $ group $ sort string

main = do
    fileContent <- readFile "./input/day6.txt"
    let fileLines = lines fileContent
    putStrLn $ getCode fileLines