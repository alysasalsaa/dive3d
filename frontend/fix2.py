import os

path = r'd:\divexplore\dive3d\frontend\app\dashboard\AdminDashboard.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("`API_URL + '/'`", "API_URL + '/'")
content = content.replace("`API_URL + '/''`", "API_URL + '/'")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
