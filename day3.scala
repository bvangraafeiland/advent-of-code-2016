object day3 {
  def main(args: Array[String]) {
    val sides = input.split("\n").flatMap(splitLine).toList
    val columns = getColumn(sides, 0) ++ getColumn(sides, 1) ++ getColumn(sides, 2)
    println(numValidTriangles(columns))
  }

  def numValidTriangles(columns: List[Int]): Int =
    columns match {
      case List() => 0
      case _ => (if (validTriangle((columns.head, columns(1), columns(2)))) 1 else 0) + numValidTriangles(columns.drop(3))
    }

  def getColumn(sides: List[Int], i: Int) = sides.zipWithIndex.filter(_._2 % 3 == i).map(_._1)

  def splitLine(line: String) = line.trim.split("""\s+""").map(Integer.parseInt)

  def validTriangle(triangle: (Int, Int, Int)) = triangle._1 + triangle._2 > triangle._3 && triangle._1 + triangle._3 > triangle._2 && triangle._2 + triangle._3 > triangle._1

  def input = io.Source.fromFile("input/day3.txt").mkString
}