export async function getDivision() {
    const response = await fetch("http://absb.herokuapp.com/api/area/")
    const jsonData = await response.json()
    return jsonData
}

export default async function handler(req, res) {
    const jsonData = await getDivision()
    res.status(200).json(jsonData)
}