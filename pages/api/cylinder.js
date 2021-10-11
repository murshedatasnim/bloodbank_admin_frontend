export async function getCylinder() {
    const response = await fetch("http://absb.herokuapp.com/api/cylinder/")
    const jsonData = await response.json()
    return jsonData
}

export default async function handler(req, res) {
    const jsonData = await getCylinder()
    res.status(200).json(jsonData)
}