import pandas as pd
import pandas as pd
from calendar import monthrange

def saveJson(df,write_path,precision=2):
    df.to_json(write_path,orient='records',double_precision=precision,compression='infer')

def process_data():
    df = pd.read_csv('natural-gas-liquids-exports-monthly.csv',engine='python')
    df['Period'] = pd.to_datetime(df['Period'])
    df = df[df['Period'].dt.year >= 2015]
    for delete in ['Value (CN$)','Value (US$)', 'Price (CN cents/L)', 'Price (US cents/gallon)','Year','Volume (m3)','Month']:
        del df[delete]
    df['Origin'] = df['Origin'].replace({'Total':'Canada','Qu�bec':'Quebec'})
    df = df[~df['Origin'].isin(['Yukon'])]
    df = df.rename(columns={'Destination / PADD':'Destination'})
    df['Days in Month'] = [monthrange(x.year,x.month)[-1] for x in df['Period']]
    df['Volume (Mb/d)'] = [(x/days)/1000 for x,days in zip(df['Volume (bbl)'],df['Days in Month'])]
    df['Volume (Mb/d)'] = df['Volume (Mb/d)'].round(2) 
    del df['Days in Month']
    del df['Volume (bbl)']
    for remove_total in ['Destination','Mode of Transportation']:
        df = df[df[remove_total]!='Total']
    
    df = df.groupby(by=['Period','Product','Origin','Mode of Transportation']).sum().reset_index()
    
    df_nonTidy = pd.pivot_table(df,
                               values='Volume (Mb/d)',
                               index=['Period','Product','Origin'],
                               columns='Mode of Transportation').reset_index()

    
    df_nonTidy = df_nonTidy.sort_values(by=['Period','Product','Origin'])
    saveJson(df_nonTidy, 'non-tidy.json')
    saveJson(df,'tidy.json')
    return df_nonTidy,df
    
    
if __name__ == "__main__":
    nonTidy,tidy = process_data()