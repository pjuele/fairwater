from fastapi import FastAPI

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")


@app.get("/api/healthchecker")
def healthchecker():
    return {"status": "success", "message": "Integrate FastAPI Framework with Next.js"}


# from fastapi import FastAPI
import pycountry
import json

# app = FastAPI()

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@app.get("/api")
async def root():
    return {"message": "Please use a valid access point URL!"}

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

@app.get("/api/signatories")
async def signatories():
    result = []
    dd = get_signatories_data()
    print(dd)
    for row in dd[1:]:
        name = row[0]
        isoData = pycountry.countries.get(name=name)
        t = get_treaty_names()
        result.append(
            {
                "name": name,
                "region": row[1],
                t[0]: row[2],
                t[1]: row[3],
                t[2]: row[4],
                t[3]: row[5],
                t[4]: row[6],
                t[5]: row[7],
                t[6]: row[8],
                t[7]: row[9],
                "isoData": isoData
            }
        )
    return result

@app.get("/api/treaties")
async def treaties():
    return get_treaties_index()

@app.get("/api/countries")
async def countries():
    return get_countries_data()

@app.get("/api/data/{countryIsoCode}")
async def countryData(countryIsoCode: str):
    return {
        "success": True,
        "data": pycountry.countries.get(alpha_2=countryIsoCode.upper()),
        }


# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Aux functions:
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

def get_treaties_index():
    with open('data/treaties-index.json') as t:
        treaties_index = json.load(t)
    return treaties_index

def get_signatories_data():
    with open('data/tabula-amnesty.json') as f:
        dd = json.load(f)
    return dd

def get_countries_data():
    with open('data/countries.json') as f:
        jd = json.load(f)
    return jd

def get_treaty_names():
    treaty_names = []
    treaties = get_treaties_index()
    for treaty in treaties:
        treaty_names.append(str(treaty["code"]).replace(" ", "_").replace("/", "_"))
    print(treaty_names)
    return treaty_names