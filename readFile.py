import pandas as pd
df=pd.read_csv('C:\\Users\\bsaket\\OneDrive - MathWorks\\Desktop\\ReadFile Project\\breakdown.csv');
print (df)
df= df.groupby(['Employee','Customer'])['Hours'].sum()
print (df)