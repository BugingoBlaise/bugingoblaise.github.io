---
layout: post
title: "Deep Learning: From Theory to Practice"
date: 2025-09-04
categories: [Machine Learning]
---

## Navigation

- [Home](index.html)
- [About](about.html)

---

![Neural Networks](https://images.unsplash.com/photo-1527474305487-b87b222841cc)

# Deep Learning: From Theory to Practice

**Sep 4, 2025 • 15 min read • Machine Learning**

---

## Table of Contents

- [Neural Network Architecture](#neural-networks)
- [Backpropagation Algorithm](#backpropagation)
- [Optimization Techniques](#optimization)
- [PyTorch Implementation](#implementation)

---

## Neural Network Architecture {#neural-networks}

Let's explore the fundamental components of neural networks, starting with the neuron model:

### Mathematical Foundation

The output of a neuron is given by:

$$y = \sigma\left(\sum_{i=1}^{n} w_i x_i + b\right)$$

where:

- σ is the activation function
- w_i are the weights
- x_i are the inputs
- b is the bias term

### Code Implementation

```python
import numpy as np

class Neuron:
    def __init__(self, weights, bias):
        self.weights = np.array(weights)
        self.bias = bias

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))

    def forward(self, inputs):
        total = np.dot(self.weights, inputs) + self.bias
        return self.sigmoid(total)
```

---

## Backpropagation Algorithm {#backpropagation}

### Mathematical Formulation

The gradient descent update rule:

$$w_{ij}^{(l)} = w_{ij}^{(l)} - \alpha \frac{\partial E}{\partial w_{ij}^{(l)}}$$

$$\frac{\partial E}{\partial w_{ij}^{(l)}} = \delta_j^{(l)} a_i^{(l-1)}$$

> ⚠️ **Note:** Vanishing gradients can occur with deep networks using sigmoid activation.

---

## Taylor Expansion in Neural Networks {#taylor-expansion}

### Mathematical Foundation

The Taylor expansion principle helps us understand how the loss function changes with small updates to the weights:

#### First Principles

Take a small step from the current position w^n to a new position w^(n+1):

$$L(w^{n+1}) \approx L(w^n) + \nabla L(w^n) \cdot (w^{n+1} - w^n)$$

_To decrease L, we want (w^(n+1) - w^n) to be opposite to ∇L(w^n)._

### Implementation

```python
def gradient_descent_step(w_current, gradient, learning_rate):
    """
    Implement gradient descent using Taylor expansion principle

    Args:
        w_current: Current weights
        gradient: Computed gradient (∇L)
        learning_rate: Step size (η)
    """
    w_next = w_current - learning_rate * gradient
    return w_next
```

> 💡 **Key Insight:** The Taylor expansion provides the theoretical foundation for gradient descent optimization in neural networks

---

## Optimization Techniques {#optimization}

### Optimization Methods Comparison

| Adam Optimizer                             | RMSprop                                                           |
| ------------------------------------------ | ----------------------------------------------------------------- |
| $m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t$   | $v_t = \gamma v_{t-1} + (1-\gamma)g_t^2$                          |
| $v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2$ | $\theta_t = \theta_{t-1} - \frac{\eta}{\sqrt{v_t + \epsilon}}g_t$ |

---

## PyTorch Implementation {#implementation}

```python
import torch
import torch.nn as nn

class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(NeuralNet, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        out = self.fc1(x)
        out = self.relu(out)
        out = self.fc2(out)
        return out
```

---

## About the Author

![Author](https://images.unsplash.com/photo-1519345182560-3f2917c472ef)

**Written by Blaise**  
_ML Engineer & Technical Writer_

---

_© 2025 Blaise. All rights reserved._
