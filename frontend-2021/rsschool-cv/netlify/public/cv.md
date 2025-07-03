## Evgenii Sherbakov
```
E-mail: iipekolict@gmail.com
Telegram: @IIPEKOLICT
GitHub: https://github.com/IIPEKOLICT
```

### About me
I am going to become a javascript frontend developer. I have a high learning ability, perseverance and desire to develop 
in this area.

### My skills
Program languages:
- JavaScript
- Python

Frameworks:
- Express

Preprocessors:
- Pug
- Stylus
- Sass

VCS:
- Git
- GitHub

Development tools:
- Gulp
- npm

### Code examples

Hello world (pug):
```pug
div.container
    p.text Hello world
```

Euclidean distance in n dimensions (js):
```javascript
function euclideanDistance(point1, point2) {
  let rez = 0
  for (let i = 0; i < point1.length; i++) rez += Math.pow(Math.abs(point1[i] - point2[i]), 2)
  return Number(Math.sqrt(rez).toFixed(2))
}
```

Alphabet wars (python):
```python
def alphabet_war(fight):
    left = right = 0
    left_score = {'w': 4, 'p': 3, 'b': 2, 's': 1}
    right_score = {'m': 4, 'q': 3, 'd': 2, 'z': 1}
    
    for letter in fight:
        if letter in left_score:
            left += left_score[letter]
        elif letter in right_score:
            right += right_score[letter]
    
    if left > right:
        return 'Left side wins!'
    elif left < right:
        return 'Right side wins!'
    else:
        return "Let's fight again!"
```

### Work experience

#### Freelance _(Minsk, Belarus)_ 
- [Todos app on Express](https://github.com/IIPEKOLICT/todos-express)
- [Python console app for school](https://github.com/IIPEKOLICT/school)
- [Python console app for bowling club](https://github.com/IIPEKOLICT/bowling)
- [Doors shop landing page (HTML + SCSS)](https://iipekolict.github.io/yap/maket/)

### Education
- **BSUIR, IIT**
    
    _Speciality "Program mobile systems"_

### English knowledge level
My english knowledge level is A2 (Pre-Intermediate)
